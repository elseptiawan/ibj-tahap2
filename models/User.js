module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('User', {
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
          email : {
            type : Datatypes.STRING,
            allowNull : false
          },
          password : {
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
        tableName: 'users'
    });
    User.associate = function(models) {
      User.hasMany(models.UserCourse, {
          foreignKey: 'users_id',
          as: 'user_courses'
      });
  }

    return User;
}