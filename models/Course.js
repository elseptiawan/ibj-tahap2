module.exports = (sequelize, Datatypes) => {
    const Course = sequelize.define('Course', {
        id: {
            type : Datatypes.BIGINT,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
          },
          title : {
            type : Datatypes.STRING,
            allowNull : false
          },
          course_category_id : {
            type : Datatypes.BIGINT,
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
        tableName: 'courses'
    });
    Course.associate = function(models) {
      Course.hasMany(models.UserCourse, {
          foreignKey: 'course_id',
          as: 'user_courses'
      });
      Course.belongsTo(models.CourseCategory, {
        foreignKey: 'course_category_id',
        as: 'category'
    });
    }

    return Course;
}