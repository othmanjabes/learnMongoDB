const mongoose = require("mongoose"); //framwork to use mongodb

const dbConection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) => {
      console.log("Database conected succses! :" + conn.connection.host);
    })
};

module.exports = dbConection;
