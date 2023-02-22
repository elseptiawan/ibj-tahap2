const {Course, UserCourse, CourseCategory, User} = require('../models');
const Validator = require('fastest-validator');

const v = new Validator();

exports.index = async (req, res) => {
    try{
        const courses = await Course.findAll({
            include: [
                {
                    model: UserCourse,
                    as: 'user_courses',
                    include : [
                        {
                            model : User,
                            as : 'user',
                            attributes: {
                                exclude: ['password']
                            }
                        }
                    ]
                },
                {
                    model: CourseCategory,
                    as: 'category'
                }
            ],
            order : [
                ['course_category_id', 'ASC']
            ]
        });

        res.json({message : 'Success Get All Courses', response : courses});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.show = async (req, res) => {
    try{
        const course = await Course.findOne({
            where : {
                id : req.params.id
            },
            include: [
                {
                    model: UserCourse,
                    as: 'user_courses',
                    include : [
                        {
                            model : User,
                            as : 'user',
                            attributes: {
                                exclude: ['password']
                            }
                        }
                    ]
                },
                {
                    model: CourseCategory,
                    as: 'category'
                }
            ]
        });

        if(!course) {
            return res.json({message : 'Data not Found'});
        }

        res.json({message : 'Success Get Course', response : course});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.store = async (req, res) => {
    const schema = {
        title : 'string|empty:false',
        course_category_id : 'number'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try{
        const course = await Course.create(req.body);

        res.json({message : 'Success Create Course', response : course});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.update = async (req, res) => {
    const schema = {
        title : 'string|empty:false',
        course_category_id : 'number'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try{
        var course = await Course.findByPk(req.params.id);

        if(!course) {
            return res.json({message : 'Data not Found'});
        }

        course = await course.update(req.body);

        res.json({message : 'Success Update Course', response : course});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.destroy = async (req, res) => {
    try{
        var course = await Course.findByPk(req.params.id);

        if(!course) {
            return res.json({message : 'Data not Found'});
        }

        await course.destroy();

        res.json({message : 'Success Delete Course', response : course});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}