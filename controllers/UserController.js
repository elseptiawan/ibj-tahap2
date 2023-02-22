const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {User, UserCourse, Course, CourseCategory} = require('../models');
const Validator = require('fastest-validator');

const v = new Validator();

exports.index = async (req, res) => {
    try{
        const user = await User.findAll({
            include: [
                {
                    model: UserCourse,
                    as: 'user_courses',
                    include : [
                        {
                            model : Course,
                            as : 'course',
                            include : [
                                {
                                    model : CourseCategory,
                                    as : 'category'
                                }
                            ]
                        }
                    ]
                }
            ],
            attributes: {
                exclude: ['password']
            }
        });

        res.json({message : 'Success Get All Users', response : user});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.show = async (req, res) => {
    try{
        const user = await User.findOne({
            where : {
                id : req.params.id
            },
            include: [
                {
                    model: UserCourse,
                    as: 'user_courses',
                    include : [
                        {
                            model : Course,
                            as : 'course',
                            include : [
                                {
                                    model : CourseCategory,
                                    as : 'category'
                                }
                            ]
                        }
                    ]
                }
            ],
            attributes: {
                exclude: ['password']
            }
        });

        if(!user) {
            return res.json({message : 'Data not Found'});
        }

        res.json({message : 'Success Get User', response : user});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

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
        const user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 8)
        });

        res.json({message : 'Success Create User', response : user});
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
        var user = await User.findOne({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compareSync(req.body.password, user.password);
        if(!match) return res.status(400).json({success: 'false', message: 'wrong password'});
        const userId = user.id;
        const email = user.email;

        const token = jwt.sign({userId, email}, process.env.API_SECRET, {
            expiresIn: '86400s'
        });

        user = await User.findOne({
            where:{
                email: req.body.email
            },
            attributes: {
                exclude: ['password']
            }
        });
        
        res.json({success: 'true', response: user, token: token});
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

    var user = await User.findByPk(req.userId);
    const match = await bcrypt.compareSync(req.body.old_password, user.password);
    if (!match) {
        return res.status(400).json({message : 'Old Password not match'});
    }

    try{
        user = await user.update({
            password : bcrypt.hashSync(req.body.new_password, 8)
        });

        res.json({message : 'Success Change Password', response : user});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.editName = async (req, res) => {
    const schema = {
        name : 'string|empty:false'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try{
        var user = await User.findByPk(req.userId);

        user = await user.update(req.body);

        res.json({message : "Success Update user's name", response : user});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.destroy = async (req, res) => {
    try{
        var user = await User.findByPk(req.params.id);

        if(!user) {
            return res.json({message : 'Data not Found'});
        }

        await user.destroy();

        res.json({message : 'Success Delete User', response : user});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}