module.exports = {
  PORT: process.env.PORT ? process.env.PORT : 8000,
  DB: process.env.DB ? process.env.DB : 'mongodb://localhost:27017/mernapp'
};
