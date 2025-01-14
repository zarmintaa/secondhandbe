/** @format */

const { user: User } = require('../models');

module.exports = async (req, res, next) => {
  const { userId } = req.userLoggedin;
  const user = await User.findByPk(userId);
  // console.log('ini address', user.dataValues.address);
  if (user.address == null || user.phone_number == null || user.city_id == null || user.profile_picture == null) {
    return res.status(403).json({
      message: 'Please complete your profile first!',
    });
  }
  next();
};
