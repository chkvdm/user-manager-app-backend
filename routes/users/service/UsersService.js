import Users from '../../../models/Users.js';

export default class UsersService {
  async oneUsersRow(email) {
    const a = await Users.findOne({ where: { email: email } });
    if (!a) return false;
    return a;
  }

  async allUsersRow() {
    const x = await Users.findAll();
    return x;
  }

  async updateStatus(email, newStatus) {
    const user = await Users.update(
      { status: newStatus },
      {
        where: {
          email: email,
        },
      }
    );
    return user;
  }

  async changeDateFormat(timestamp) {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const localISOTime = new Date(timestamp - tzoffset)
      .toISOString()
      .slice(0, -1);
    return `${localISOTime.substring(0, 10)} ${localISOTime.substring(11, 16)}`;
  }

  async deleteByEmail(email) {
    await Users.destroy({
      where: {
        email,
      },
    });
  }
}
