import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  console.log('** Hit API GET /pipelines');
  return res.status(200).json({
    name: 'Master Sword',
    status: 'success'
  });
});

export default router;
