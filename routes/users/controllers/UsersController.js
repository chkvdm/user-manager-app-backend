import UsersService from '../service/UsersService.js';
const usersService = new UsersService();

export default class UsersController {
  async getUserStatus(req, res, next) {
    try {
      const { email } = req.query;
      const x = await usersService.oneUsersRow(email);
      return res.status(200).json({ status: x.status });
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const allUsers = await usersService.allUsersRow();
      const filterUsersDataPromises = allUsers.map(async (el) => ({
        name: el.name,
        email: el.email,
        registrationDate: await usersService.changeDateFormat(
          el.registrationDate
        ),
        lastLogin: await usersService.changeDateFormat(el.lastLoginDate),
        status: el.status,
      }));
      const filterUsersData = await Promise.all(filterUsersDataPromises);
      return res.status(200).json({ users: filterUsersData });
    } catch (err) {
      next(err);
    }
  }

  async changeUserStatus(req, res, next) {
    try {
      const { email, status } = req.body;
      await usersService.updateStatus(email, status);
      const updatedUser = await usersService.oneUsersRow(email);
      return res.status(201).json({ newStatus: updatedUser.status });
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { email } = req.body;
      await usersService.deleteByEmail(email);
      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}
