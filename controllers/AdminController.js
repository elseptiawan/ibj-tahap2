const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {Admin} = require('../models');
const Validator = require('fastest-validator');

const v = new Validator();

exports.signup = async (req, res) => {
    const schema = {
        name : 'string|empty:false',
        email : 'email',
        password : 'string|min:6',
        confirm_password : 'string|min:6'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    if (req.body.password != req.body.confirm_password) {
        return res.status(400).json({message : 'Password must be same'})
    }

    try{
        const admin = await Admin.create({
            name : req.body.name,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 8)
        });

        res.json({message : 'Success Create Admin', response : admin});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.login = async(req, res) => {
    const schema = {
        email : 'email',
        password : 'string|min:6'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try {
        var admin = await Admin.findOne({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compareSync(req.body.password, admin.password);
        if(!match) return res.status(400).json({success: 'false', message: 'wrong password'});
        const userId = admin.id;
        const email = admin.email;

        const token = jwt.sign({userId, email}, process.env.API_SECRET, {
            expiresIn: '86400s'
        });

        admin = await Admin.findOne({
            where:{
                email: req.body.email
            },
            attributes: {
                exclude: ['password']
            }
        });
        
        res.json({success: 'true', response: admin, token: token});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.changePassword = async (req, res) => {
    const schema = {
        old_password : 'string|min:6',
        new_password : 'string|min:6',
        confirm_new_password : 'string|min:6',
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    if (req.body.password != req.body.confirm_password) {
        return res.status(400).json({message : 'Password must be same'})
    }

    var admin = await Admin.findByPk(req.userId);
    const match = await bcrypt.compareSync(req.body.old_password, admin.password);
    if (!match) {
        return res.status(400).json({message : 'Old Password not match'});
    }

    try{
        admin = await admin.update({
            password : bcrypt.hashSync(req.body.new_password, 8)
        });

        res.json({message : 'Success Change Password', response : admin});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}