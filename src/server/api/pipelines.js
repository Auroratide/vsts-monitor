import { Router } from 'express';
import vsts from '../service/vsts';
import {
  statusFor,
  buildStatus,
  sortByOrder,
  keepOnlyTasks,
  getReleaseDefinitionWithBuildId,
  organizeIntoEnvironmentBuckets,
  findFirstReleaseStarted,
  orderByRank,
  statusForRelease
} from '../transformers/pipelines';

const router = Router();

/** Response Body
{
  name: <string>,
  status: <string:'success', 'failure', 'unknown'>,
  stages: [ {
    name: <string>,
    status: <string:'success', 'failure', 'progress', 'pending', 'cancelled', 'unknown'>
  } ]
}
 */
router.get('/:projectid/:id', (req, res) => {
  console.log('** Hit API GET /pipelines');

  const response = {};
  response.stages = [];
  return vsts.getMostRecentBuild(req.params.projectid,req.params.id)
    .then(data => {
      const build = data.value[0];
      response.name = build.definition.name;

      if(build.status !== 'completed') {
        return vsts.getMostRecentCompletedBuild(req.params.projectid,req.params.id).then(d => {
          response.status = buildStatus(d.value[0]);
          return vsts.getBuildTimeline(req.params.projectid,build.id);
        }).catch(() => {
          response.status = 'failure';
        });
      } else {
        response.status = buildStatus(build);
        return vsts.getBuildTimeline(req.params.projectid,build.id);
      }
    })
    .then(data => data.records)
    .then(keepOnlyTasks)
    .then(sortByOrder)
    .then(records => {
      response.stages = response.stages.concat(records.map(record => {
        return {
          name: record.name,
          status: statusFor(record)
        };
      }));
    })
    .catch(error => {
      console.error(error);
    })

    .then(() => vsts.getReleaseDefinitions(req.params.projectid))
    .then(releaseResponse => releaseResponse.value)
    .then(definitions => getReleaseDefinitionWithBuildId(definitions, req.params.projectid, req.params.id))
    .then(releaseDefinition => vsts.getMostRecentReleases(req.params.projectid, releaseDefinition.id).then(d => d.value))
    .then(organizeIntoEnvironmentBuckets)
    .then(buckets => {
      return Object.keys(buckets).map(env => findFirstReleaseStarted(buckets[env]));
    })
    .then(orderByRank)
    .then(envs => {
      response.stages = response.stages.concat(envs.map(env => {
        return {
          name: env.name,
          status: statusForRelease(env)
        };
      }));

      return envs;
    })
    .then(envs => {
      const envsAreGood = envs.reduce((val, env) => {
        return val && statusForRelease(env) !== 'failure';
      }, true);

      if(!envsAreGood)
        response.status = 'failure';
    })
    .catch(error => {
      console.error(error);
    })

    .then(() => {
      return res.status(200).json(response);
    });
});

export default router;
