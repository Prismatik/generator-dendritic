const { User } = require('../models');
const { createController } = require('../utils/controller');
const HttpError = require('standard-http-error');
const { createToken, hashPassword, verifyPassword } = require('../utils/auth');

module.exports = createController(User, {
  *create(params) {
    return yield super.create(yield hashPassword(params));
  },

  *update(id, params) {
    return yield super.update(id, yield hashPassword(params));
  },

  *replace(id, params) {
    return yield super.replace(id, yield hashPassword(params));
  },

  *signin(email, pass) {
    const [user] = yield User.filter({ email }).run();
    if (!user) throw new HttpError('UNAUTHORIZED');

    const verified = yield verifyPassword(pass, user.password);
    if (!verified) throw new HttpError('UNAUTHORIZED');

    const token = createToken({ id: user.id, role: user.role });

    return { token, user };
  },

  signout() {
    return { ok: true };
  }
});
