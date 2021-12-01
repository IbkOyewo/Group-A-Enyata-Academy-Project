const queries = {
  addUser: `
     INSERT INTO users (
         firstName,
         lastName,
         email,
         phoneNumber,
         password
     ) VALUES($1, $2, $3, $4, $5)
     RETURNING *
    `,
  login: `
   SELECT *
    FROM users
    WHERE email=$1 
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
  `
}

module.exports = queries