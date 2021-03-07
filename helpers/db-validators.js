const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const existRole = await Role.findOne({ role });

    if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`);
    }

}

const existEmail = async(correo = '') => {

    const exist = await User.findOne({ correo });
    if (exist) {
        throw new Error(`El email ${correo} ya está registrado`);
    }
}

const existUserById = async(id = '') => {

    const existUser = await User.findById(id);

    if (!existUser) {
        throw new Error(`El usuario con el id ${id} no existe`);
    }
}

module.exports = { isValidRole, existEmail, existUserById }