import config from '../config.js';
import { Strategy, ExtractJwt } from 'passport-jwt';

import UsersService from '../routes/users/service/UsersService.js';
const usersService = new UsersService();

export const jwtStrategy = new Strategy(
  {
    secretOrKey: config.secretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (token, done) => {
    try {
      const x = await usersService.oneUsersRow(token.email);
      if (x && x.status == 'active') {
        return done(null, token.email);
      }
      return done(null);
    } catch (err) {
      return done(err);
    }
  }
);
