const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users.repository");
const { imageUpload } = require("../utils/imageHandler");
const { Unauthorized } = require("../utils/request");

exports.register = async (data, file) => {
  if (file?.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }

  const user = await userRepository.createUser(data);
  const token = createToken(user);

  delete user.password;

  return {
    user,
    token,
  };
};

exports.login = async (email, password) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Unauthorized("Email Or Password Incorrect!");
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new Unauthorized("Email Or Password Incorrect!");
  }

  const token = createToken(user);

  delete user.password;

  return {
    user,
    token,
  };
};

const createToken = (user) => {
  const payload = {
    user_id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "72h",
  });

  return token;
};
