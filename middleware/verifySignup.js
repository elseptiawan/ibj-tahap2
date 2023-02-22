const { Admin, User } = require('../models');

checkDuplicateEmail = async (req, res, next) => {
   let admin = await Admin.findOne({
    where : {
        email : req.body.email
    }
   });

   if (admin) {
    return res.status(400).json({message: 'Email is already in use'});
   }

   let user = await User.findOne({
    where : {
        email : req.body.email
    }
   });

   if(user) {
    return res.status(400).json({message : 'Email is already in use'})
   }
   next();
}

const verifySignup
 = {
    checkDuplicateEmail
};
module.exports = verifySignup
;