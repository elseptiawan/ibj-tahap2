module.exports = (sequelize, Datatypes) => {
    const CourseCategory = sequelize.define('CourseCategory', {
        id: {
            type : Datatypes.BIGINT,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
          },
          name : {
            type : Datatypes.STRING,
            allowNull : false
          },
          createdAt : {
            type : Datatypes.DATE,
            allowNull : false
          },
          updatedAt : {
            type : Datatypes.DATE,
            allowNull : false
          }
    }, {
        tableName: 'course_categories'
    });
    CourseCategory.associate = function(models) {
        CourseCategory.hasMany(models.Course, {
            foreignKey: 'course_category_id',
            as: 'courses'
        });
    }

    return CourseCategory;
}