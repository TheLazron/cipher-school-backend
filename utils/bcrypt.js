import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(4);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

const comparePasswords = async (password1, hashedPass) => {
  const result = await bcrypt.compare(password1, hashedPass);
  return result;
};

export { hashPassword, comparePasswords };
