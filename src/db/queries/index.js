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
  SELECT *
   FROM adminregister
   WHERE email=$1 
   `,
  userApplication: `
     INSERT INTO userapplication (
         fname,
         lname,
         email,
         cgpa,
         address,
         course,
         university,
         dob,
         cv,
         image
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING *
      `,
  getUserFromApplication: `
  SELECT *
    FROM userapplication
    WHERE email=$1 
    `,
  batchEntries: `
    SELECT
         fname,
         lname,
         email,
         cgpa,
         address,
         university,
         dob
         FROM userapplication
         ORDER BY fname
  `,
  setNewApplication: `
      INSERT INTO application_details (
        batchId,
        image,
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
  getUserById: `
  SELECT * FROM userApplication where id=$1
  `,
  getAdminById: `
  SELECT * FROM adminregister where id=$1
  `,
  getAdminProfile: `
    SELECT * FROM adminregister
     `,
  getResults: `
    SELECT userapplication.id, fname, lname, email,dob,address, university, cgpa,test_results.id, testscores FROM userapplication
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
  insertFiles:`
  INSERT INTO userapplication(
    cv,image
  ) VALUES ($1, $2)
  `,
  submit_assessment: `
      INSERT INTO assessmentHistory (
         batch,
        dateComposed,
        NoofQuestions,
        timeAllocated,
        status
    ) VALUES ($1, $2, $3, $4, $5)
    `,
  assessmentHistory: `
  SELECT * FROM assessmentHistory
  `,
};

module.exports = queries;