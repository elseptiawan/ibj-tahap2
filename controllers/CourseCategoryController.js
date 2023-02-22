const {CourseCategory} = require('../models');
const Validator = require('fastest-validator');

const v = new Validator();

exports.index = async (req, res) => {
    try{
        const course_categories = await CourseCategory.findAll({
            include : 'courses'
        });

        res.json({message : 'Success Get All Course Categories', response : course_categories});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.show = async (req, res) => {
    try{
        const course_category = await CourseCategory.findOne({
            where : {
                id : req.params.id
            },
            include : 'courses'
        });

        if(!course_category) {
            return res.json({message : 'Data not Found'});
        }

        res.json({message : 'Success Get Course Category', response : course_category});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.store = async (req, res) => {
    const schema = {
        name : 'string|empty:false'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try{
        const course_category = await CourseCategory.create(req.body);

        res.json({message : 'Success Create Course Category', response : course_category});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.update = async (req, res) => {
    const schema = {
        name : 'string|empty:false'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try{
        var course_category = await CourseCategory.findByPk(req.params.id);

        if(!course_category) {
            return res.json({message : 'Data not Found'});
        }

        course_category = await course_category.update(req.body);

        res.json({message : 'Success Update Course Category', response : course_category});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.destroy = async (req, res) => {
    try{
        var course_category = await CourseCategory.findByPk(req.params.id);

        if(!course_category) {
            return res.json({message : 'Data not Found'});
        }

        await course_category.destroy();

        res.json({message : 'Success Delete Course Category', response : course_category});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}