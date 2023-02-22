const jwt = require("jsonwebtoken");
const { Admin, User } = require("../models");

verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json({success: 'false', meessage: 'unauthorized'});;
    jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.userId = decoded.userId;
        req.email = decoded.email;
        next();
    });
}

isAdmin = async (req, res, next) => {
    try {
      const admin = await Admin.findOne({
        where : {
            email : req.email
        }
      });
      if (!admin){
        return res.status(403).send({
            message: "Require Admin Role!",
          });
      }
      return next();
    } catch (error) {
      return res.status(500).send({
        message: "Unable to validate User role!",
      });
    }
}

isUser = async (req, res, next) => {
    try {
      const user = await User.findOne({
        where : {
            email : req.email
        }
      });
      if (!user){
        return res.status(403).send({
            message: "This Feature Only For User!",
          });
      }
      return next();
    } catch (error) {
      return res.status(500).send({
        message: "Unable to validate User role!",
      });
    }
}

const authJwt = {
    verifyToken,
    isAdmin,
    isUser
  };
module.exports = authJwt;