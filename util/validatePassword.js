const bcrypt = require("bcrypt");

const validatePassword = (password, hash) => bcrypt.compare(password, hash);

module.exports = validatePassword;
