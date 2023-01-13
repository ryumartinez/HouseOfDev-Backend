const { Properties } = require("../models/propertyModel");
const { Op } = require("sequelize");
/**
 * @desc Listar propiedades
 * @route GET /properties
 * @access Protegido
 */
const getAllProperties = async (req, res) => {
  // conseguir la lista de mi base de datos
  const properties = await Properties.findAll();
 
  res.json(properties);
};

/**
 * @desc Crear nueva propiedad
 * @route POST /properties
 * @access Protegido
 */
const createNewProperty = async (req, res) => {
  const { name, description, imageUrl, area, direccion, habitaciones,sanitarios,precio } =
    req.body;
  // Confirmar data

  // creando y guardando en la db
  const property = await Properties.create({
    name,
    description,
    imageUrl,
    area,
    direccion,
    habitaciones,
    sanitarios,
    precio
  });
  if (property) {
    return res.status(201).json({ message: "Nueva propiedad creada" });
  } else {
    return res
      .status(400)
      .json({ message: "Hubo un error creando la propiedad" });
  }
};

/**
 * @desc Eliminar una propiedad en base a su id
 * @route DELETE /properties
 * @access Protegido
 */
const deleteProperty = async (req, res) => {
  const { id } = req.body;
  console.log(id)
  // Confirmo la data
  if (!id) {
    return res.status(400).json({ message: "ID de la propiedad requerido" });
  }
  // Confirmo si la propiedad existe en la db
  const property = await Properties.findOne({where:{id}});
  if (!property) {
    return res.status(400).json({ message: "´Propiedad no encontrada" });
  }
  await Properties.destroy({ where: { id } });
  res.status(200);
};

/**
 * @desc Buscar una propiedad
 * @route GET /properties/:search
 * @access Protegido
 */
const searchProperties = async (req, res) => {
  const { search,precio,habitaciones} = req.query;
  
  const properties = await Properties.findAll({
    order:[
      ["precio",`${precio}`], ["habitaciones",`${habitaciones}`]
    ],
    where: {
      [Op.or]: [
        { categoria: { [Op.iLike]: `%${search}%` } },
        { name: { [Op.iLike]: `%${search}%` } },
        { direccion: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ],
    },
  });
 

 res.send(properties)
};

module.exports = {
  getAllProperties,
  createNewProperty,
  deleteProperty,
  searchProperties,
};
