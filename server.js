require("dotenv").config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Users } = require("./models/userModel");
const { Properties } = require("./models/propertyModel");
const { Favorites } = require("./models/favoriteModel");

const { db } = require("./db");
const { urlencoded } = require("express");

const dbsync = async () => {
  try {
    await db.sync({ force: false });

    console.log("db sincronizada");
  } catch (error) {
    console.error("no se pudo sincronizar la db");
  }
};
const PORT = process.env.PORT || 3500;
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/properties", require("./routes/propertyRoutes"));
app.use("/favorites",require("./routes/favoriteRoutes"))

app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

dbsync();

app.listen(PORT, () => {
  console.log(`app running on localhost:${PORT}`);
});
