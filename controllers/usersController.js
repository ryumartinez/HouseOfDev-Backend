const bcrypt = require("bcrypt");
const { Users } = require("../models/userModel");

/**
 * @desc Conseguir un usuario
 * @route GET /users/:user
 * @access Protegido
 */
const getSingleUser = async (req,res) =>{
  const {id} = req.body
   //confirmo la data
   if (!id) {
    return res.status(400).json({ message: "Id de usuario requerido" });
  }
  //busco el usuario en mi db
  const user = await Users.findOne({where:{id}})
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }
  res.send(user)
}

/**
 * @desc Conseguir todos los usuarios
 * @route GET /users
 * @access Protegido
 */

const getAllUsers = async (req, res) => {
  //consigo todos los usuarios de mi tabla Users
  const users = await Users.findAll();
  res.json(users);
};

/**
 * @desc Crear un nuevo usuario
 * @route POST /users
 * @access Publico
 */
const createNewUser = async (req, res) => {
  const { username, password, email,telefono } = req.body;
  //confirmo la data
  if (!username || !password ) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  //hasheo la contraseña
  const hashedPwd = await bcrypt.hash(password, 10);
  //creo el nuevo usuario
  const newUser = {
    username,
    password: hashedPwd,
   telefono,
    email,
    
  };
  const user = await Users.create(newUser);
  if (user) {
    //created
    res.status(201).json({ message: `Nuevo usuario ${username} creado` });
  } else {
    res.status(400).json({ message: "No se puedo crear el usuario" });
  }
};

/**
 * @desc Eliminar un usuario
 * @route DELETE /users
 * @access Protegido
 */
const deleteUser = async (req, res) => {
  const { id } = req.body;
  //confirmo la data
  if (!id) {
    return res.status(400).json({ message: "Id de usuario requerido" });
  }
  //me fijo si el usuario existe
  const user = await Users.findOne({ where: { id } });
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }
  await Users.destroy({ where: { id } });
  res.status(200);
};

module.exports = {
  getSingleUser,
  getAllUsers,
  createNewUser,
  deleteUser,
};
