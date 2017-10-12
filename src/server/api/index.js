import { Router } from 'express';
import bodyparser from 'body-parser';
import pipelines from './pipelines';
import login from './login';

const router = Router();

router.use(bodyparser.json());

router.use('/pipelines', pipelines);
router.use('/login', login);

export default router;
