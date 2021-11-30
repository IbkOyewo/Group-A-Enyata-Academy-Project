const queries = {
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
  adminLogin: `
    INSERT INTO admin (
        email,
        password
    ) VALUES ($1,$2)
    RETURNING *
     `,
  userApplication: `
     INSERT INTO userApplication (
         fname,
         lname,
         email,
         cpga,
         address,
         course,
         university,
         dob
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *
      `,
};

module.exports = queries;


// module.exports = query;
