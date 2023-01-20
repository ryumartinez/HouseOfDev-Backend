// @ts-nocheck
const { Users } = require("../models/userModel");
require("dotenv").config()
const acces_token_secret = process.env.ACCESS_TOKEN_SECRET
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Favorites } = require("../models/favoriteModel");

/**
 * @desc Login
 * @route POST /auth
 * @access Publico
 */
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Todos los campos son requeridos",
    });
  }
  const foundUser = await Users.findOne({ where: { username } });
  if (!foundUser) {
    return res.status(401).json({ message: "no autorizado" });
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "no autorizado" });
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        role: foundUser.role,
        id: foundUser.id,
      },
    },
    acces_token_secret,
    { expiresIn: "2d" }
  );
  res.send({ accessToken });
};
/**
 * @desc Session
 * @route GET /auth/session
 * @access Protegido
 */
const getSession = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado" });
  }
  const token = authHeader.split(" ")[1];
  const decoded = jwt.decode(token)
  if(decoded.UserInfo){
      const user = await Users.findOne({where:{id:decoded.UserInfo.id}})
    res.send(user)
  }
 

};

module.exports = {
  login,
  getSession
};
