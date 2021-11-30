const query = {
  addUser: `
     INSERT INTO users (
         firstName,
         lastName,
         email,
         phoneNumber,
         password,
         onetime_token
     ) VALUES($1, $2, $3, $4, $5, $6)
     RETURNING *
    `,
  login: `
   SELECT *
    FROM users
    WHERE email=$1 
    `,
  updatePassword: `
          Update users SET password=$1, onetime_token=$2
          WHERE email=$3 RETURNING *
      `,
};

module.exports = query;
