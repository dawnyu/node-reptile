module.exports = {
  sequelize: {
    username:'user',
    password:'123456',
    database: 'nodejs',
    host: 'localhost',
    dialect: 'mysql',
    define:{
      underscored:false,
      timestamps: true,
      paranoid: true
    }
  }
}