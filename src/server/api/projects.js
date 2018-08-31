import { Router } from 'express';
import vsts from '../service/vsts';

const router = Router();

router.get('/', (req, res) => {
  console.log('** Hit API GET /projects');
  return vsts.getProjects()
  .then(response => res.status(200).json(response))
  .catch(e => console.log(e))
});

router.get('/:projectId', (req, res) => {
  return vsts.getDefinitions(req.params.projectId)
  .then(response=> res.status(200).json(response))
  .catch(e => console.log(e))
});

export default router;