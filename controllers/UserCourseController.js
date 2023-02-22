const {UserCourse, User, Course, CourseCategory} = require('../models');
const Validator = require('fastest-validator');

const v = new Validator();

exports.index = async (req, res) => {
    try{
        const user_courses = await UserCourse.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: Course,
                    as: 'course',
                    include : [
                        {
                            model : CourseCategory,
                            as : 'category'
                        }
                    ]
                }
            ],
            order : [
                ['course_id', 'ASC']
            ]
        });

        res.json({message : 'Success Get All User Courses', response : user_courses});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.indexForUser = async (req, res) => {
    try{
        const user_courses = await UserCourse.findAll({
            where : {
                users_id : req.userId
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: Course,
                    as: 'course',
                    include : [
                        {
                            model : CourseCategory,
                            as : 'category'
                        }
                    ]
                }
            ],
            order : [
                ['course_id', 'ASC']
            ]
        });

        res.json({message : 'Success Get All User Courses', response : user_courses});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.show = async (req, res) => {
    try{
        const user_course = await UserCourse.findOne({
            where : {
                id : req.params.id
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: Course,
                    as: 'course',
                    include : [
                        {
                            model : CourseCategory,
                            as : 'category'
                        }
                    ]
                }
            ]
        });

        if(!user_course) {
            return res.json({message : 'Data not Found'});
        }

        res.json({message : 'Success Get User Course', response : user_course});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.store = async (req, res) => {
    const schema = {
        course_id : 'number'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try{
        const user_course = await UserCourse.create({
            users_id : req.userId,
            course_id : req.body.course_id
        });

        res.json({message : 'Success Create User Course', response : user_course});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.destroy = async (req, res) => {
    try{
        var user_course = await UserCourse.findByPk(req.params.id);

        if(!user_course) {
            return res.json({message : 'Data not Found'});
        }

        await user_course.destroy();

        res.json({message : 'Success Delete User Course', response : user_course});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}