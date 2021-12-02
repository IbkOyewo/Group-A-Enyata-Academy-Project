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
  updateToken: `
  update users SET onetime_token=$1
  WHERE email=$2 RETURNING *
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
         dob,
         cv,
         image
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING *
      `,
  setNewApplication: `
      INSERT INTO application_details (
        batchId,
        imageUrl,
        applicationLink,
        closureDate,
        instructions
    ) VALUES ($1, $2, $3, $4, $5)
    `,
  composeAssessment: `
    INSERT INTO assessments (
      imageUrl,
      questions,
      optionA,
      optionB,
      optionC,
      optionD
  ) VALUES ($1, $2, $3, $4, $5, $6)
  `,
  getAssessment: `
    SELECT * FROM assessments 
    `
};

module.exports = queries;