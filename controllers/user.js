const { request, response } = require('express');
const User = require('../models/user');
const bcriptjs = require('bcryptjs');


const userGet = async(req = request, res = response) => {

    const { limit = 5, start = 0 } = req.query;
    const query = { estado: true }

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .limit(Number(limit))
        .skip(Number(start))
    ]);
    res.json({
        total,
        users
    });
}

const userPost = async(req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const user = new User({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcriptjs.genSaltSync();
    user.password = bcriptjs.hashSync(password, salt)

    // Guardar en DB
    await user.save();

    res.json({
        user
    });
}

const userDelete = async(req = request, res = response) => {

    const { id } = req.params;

    // const usuario = User.findByIdAndDelete(id);

    const usuario = User.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        usuario
    });
}

const userPut = async(req = request, res = response) => {

    const id = req.params.id;
    const { _id, password, google, corroe, ...resto } = req.body;

    // Validar contra base de datos
    if (password) {
        const salt = bcriptjs.genSaltSync();
        resto.password = bcriptjs.hashSync(password, salt)
    }

    const usuario = await User.findByIdAndUpdate(id, resto, { new: true });
    res.json({
        usuario
    });
}

const userPatch = (req = request, res = response) => {
    res.json({
        "msg": "patch api"
    });
}

module.exports = { userGet, userPost, userDelete, userPut, userPatch };