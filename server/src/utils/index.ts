import bcrypt from 'bcrypt';

export const cryptPassword = (password: string, callback: Function) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return callback(err);
    }

    bcrypt.hash(password, salt, (err, hash) => {
      return callback(err, hash);
    });
  });
};

export const comparePassword = (
  plainPassword: string,
  hashPassword: string,
  callback: Function
) => {
  bcrypt.compare(plainPassword, hashPassword, (err, same) => {
    return callback(err, same);
  });
};
