module.exports = {
  sequelize: {
    username:'user',
    password:'Abc123456.',
    database: 'mydb',
    host: 'localhost',
    dialect: 'mysql',
    define:{
      underscored:false,
      timestamps: true,
      paranoid: true
    }
  }
}