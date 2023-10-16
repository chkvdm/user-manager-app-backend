import express from 'express';
import passport from 'passport';
import UsersController from './controllers/UsersController.js';
const router = express.Router();
const usersController = new UsersController();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  usersController.getAllUsers
);

router.get(
  '/status',
  passport.authenticate('jwt', { session: false }),
  () => {}
);

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  usersController.changeUserStatus
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  usersController.deleteUser
);

export default router;
