import AuthService from '../service/AuthService.js';
const authService = new AuthService();

export default class AuthController {
  async registersUser(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const hashPassword = await authService.hashPassword(password);
      try {
        await authService.addNewUser(email, hashPassword, name);
        return res.status(201).end();
      } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(400).json({ message: 'This User already exists' });
        }
      }
    } catch (err) {
      next(err);
    }
  }
}
