import bcrypt from 'bcrypt';

export const cryptPassword = (password: string) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    return hash;
  } catch (err) {
    throw new Error('Could not generate crypt password');
  }
};

export const comparePassword = (
  plainPassword: string,
  hashPassword: string
) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
