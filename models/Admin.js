module.exports = (sequelize, Datatypes) => {
    const Admin = sequelize.define('Admin', {
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
        tableName: 'admin'
    });

    return Admin;
}