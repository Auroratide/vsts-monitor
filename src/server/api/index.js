import { Router } from 'express';
import bodyparser from 'body-parser';
import projects from './projects';
import pipelines from './pipelines';
import login from './login';

const router = Router();

router.use(bodyparser.json());

router.use('/projects', projects)
router.use('/pipelines', pipelines);
router.use('/login', login);

export default router;
