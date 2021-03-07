const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');
const { isValidRole, existEmail, existUserById } = require('../helpers/db-validators');
const router = Router();


router.get('/', userGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(isValidRole),
    validarCampos
], userPut);

router.post('/', [
    check('nombre', 'El correo es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existEmail),
    check('rol').custom(isValidRole),
    validarCampos
], userPost);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById)
], userDelete);

router.patch('/', userPatch);

module.exports = router;