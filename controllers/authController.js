// @ts-nocheck
const { Users } = require("../models/userModel");
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
    "b0694c0cbf4e7766731193f7ba75b727c79404946ca21ef491c72abd97a688c3c2cee953b9ead6c2ad8883dd28eae57c37b08d2593df5f57bda612ea6cda064a",
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
  const user = await Users.findOne({where:{id:decoded.UserInfo.id}})
  res.send(user)
};

module.exports = {
  login,
  getSession
};
