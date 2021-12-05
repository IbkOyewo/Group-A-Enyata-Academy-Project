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
  UPDATE users SET onetime_token=$1
  WHERE email=$2 RETURNING *
`,
  updatePassword: `
    UPDATE users SET password=$1, onetime_token=$2
    WHERE email=$3 RETURNING *
      `,
  adminRegister: `
      INSERT INTO adminregister (
        name,
        email,
        password,
        phoneNumber,
        country,
        address
    ) VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *
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
  batchEntries: `
    SELECT
         fname,
         lname,
         email,
         cpga,
         address,
         university,
         dob
         FROM userApplication
         ORDER BY fname
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
    `,
  getUserProfile: `
    SELECT * FROM userApplication
     `,
  getAdminProfile: `
    SELECT * FROM adminregister
     `,
  getResults: `
    SELECT userapplication.id, fname, lname, email,dob,address, university, cpga,test_results.id, testscores FROM userapplication
    INNER JOIN test_results
    ON userapplication.id = test_results.id
    `,
  total_batchId: `
  SELECT COUNT(batchId) FROM application_details
  WHERE batchId=$1
  `,
  total_application: `
  SELECT COUNT(*) FROM userapplication;
  `,
  current_application: `
  SELECT * FROM application_details
  `,
};

module.exports = queries;
