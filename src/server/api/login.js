import { Router } from 'express';
import {
  isLoggedIn,
  login
} from '../service/login';

const router = Router();

router.post('/', (req, res) => {
  console.log('** Hit API POST /login');

  if(!isLoggedIn())
    login(req.body.username, req.body.personalAccessToken);
  res.status(204).send();
});

export default router;
