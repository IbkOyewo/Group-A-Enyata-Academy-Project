const { getUser, getUserFromApplication } = require("../services");

const checkIfUserExists = async (req, res,next) => {
    try {
      const {
        email
      } = req.body;
      const [user] = await getUser(email);
        if (!user) {
           res.status(400).json({
            status: "failed",
            message: "This user is not registered",
          });
        }
        const [appliedUser] = await getUserFromApplication(email);
        if (appliedUser) {
             res.status(400).json({
              status: "failed",
              message: "This user has already sent an application",
            });
          }
     next();
    } catch (error) {
      console.log(error.message);
    }
  };
module.exports = checkIfUserExists