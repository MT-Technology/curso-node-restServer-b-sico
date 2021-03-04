const { request, response } = require('express');

const userGet = (req = request, res = response) => {

    const params = req.query;

    res.json({
        "msg": "get api",
        params
    });
}

const userPost = (req = request, res = response) => {

    const body = req.body;

    res.json({
        "msg": "post api",
        body
    });
}

const userDelete = (req = request, res = response) => {
    res.json({
        "msg": "delete api"
    });
}

const userPut = (req = request, res = response) => {

    const id = req.params.id;

    res.json({
        "msg": "put api",
        id
    });
}

const userPatch = (req = request, res = response) => {
    res.json({
        "msg": "patch api"
    });
}

module.exports = { userGet, userPost, userDelete, userPut, userPatch };