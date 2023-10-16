import Users from '../../../models/Users.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

export default class AuthService {
  constructor() {
    this.status = 'active';
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(7);
    return await bcrypt.hash(password, salt);
  }

  async addNewUser(email, hashPassword, name) {
    const newUser = await Users.create({
      email: email,
      password: hashPassword,
      name: name,
      // registrationDate: Date.now(),
      // lastLoginDate: Date.now(),
      status: this.status,
    });
    return newUser;
  }

  async findUser(email) {
    const user = await Users.findOne({ where: { email } });
    if (user) {
      return user;
    }
  }

  async validPasswords(email, password) {
    const user = await Users.findOne({ where: { email: email } });
    return await bcrypt.compare(password, user.password);
  }

  async updateLastLogin(email) {
    await Users.update(
      { lastLoginDate: Date.now() },
      {
        where: {
          email: email,
        },
      }
    );
  }
}
