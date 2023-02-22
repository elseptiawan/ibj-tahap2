module.exports = (sequelize, Datatypes) => {
    const UserCourse = sequelize.define('UserCourse', {
        id: {
            type : Datatypes.BIGINT,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
          },
          users_id : {
            type : Datatypes.BIGINT,
            allowNull : false
          },
          course_id : {
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
        tableName: 'user_courses'
    });
    UserCourse.associate = function(models) {
        UserCourse.belongsTo(models.User, {
            foreignKey: 'users_id',
            as: 'user'
        });
        UserCourse.belongsTo(models.Course, {
            foreignKey: 'course_id',
            as: 'course'
        })
    }

    return UserCourse;
}