import { Router } from 'express';
import vsts from '../service/vsts';
import {
  statusFor,
  sortByOrder,
  keepOnlyTasks
} from '../transformers/pipelines';

const router = Router();

/** Response Body
{
  name: <string>,
  status: <string:'success', 'failure', 'progress', 'pending', 'cancelled', 'unknown'>,
  stages: [ {
    name: <string>,
    status: <string:'success', 'failure', 'progress', 'pending', 'cancelled', 'unknown'>
  } ]
}
 */
router.get('/', (req, res) => {
  console.log('** Hit API GET /pipelines');

  const response = {};
  return vsts.getMostRecentBuild('1645')
    .then(data => {
      response.name = data.value[0].definition.name;
      response.status = data.value[0].result === 'succeeded' ? 'success' : 'failure';
      return vsts.getBuildTimeline(data.value[0].id);
    })
    .then(data => data.records)
    .then(keepOnlyTasks)
    .then(sortByOrder)
    .then(records => {
      response.stages = records.map(record => {
        return {
          name: record.name,
          status: statusFor(record)
        };
      });
    })
    .then(() => {
      return res.status(200).json(response);
    });
});

export default router;
