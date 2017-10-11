import { Router } from 'express';
import pipelines from './pipelines';

const router = Router();

router.use('/pipelines', pipelines);

export default router;
