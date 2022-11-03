const { Router } = require('express');
const { check } = require('express-validator');
const { validator } = require('../middleware/validator');
const { register, login, validateMyToken, getUsers, getUserByName, updateProfilePicture, updateProfileBackgroundPicture, updateProfileBiography } = require('../controllers/auth.controller');
const { validateToken } = require('../middleware/validateJwt');
const router = Router();

router.post('/register',
    [
        check('username').trim().not().isEmpty().withMessage('El nombre de usuario es requerido'),
        check('email').trim().isEmail().withMessage('El email es requerido'),
        check('password').trim().isLength({ min: 6 }).withMessage('El password debe ser de al menos 6 caracteres'),
        //verify if the password and the confirm password are the same
        check('password').custom((value, {req})=>{
            if(value!==req.body.confirmPassword){
              throw new Error('Las contraseñas no coinciden')
            } 
            return value;
          }),
        validator
    ]
    , register);

router.post('/login',
    [
        check('username').trim().not().isEmpty().withMessage('El nombre de usuario es requerido'),
        check('password').trim().isLength({ min: 6 }).withMessage('El password debe ser de al menos 6 caracteres'),
        validator
    ],
    login);

router.get('/renew-token', validateToken , validateMyToken)

router.get('/', getUsers);

router.put('/image/profile', validateToken, updateProfilePicture);
router.put('/image/background', validateToken, updateProfileBackgroundPicture);
router.put('/image/biography', validateToken, updateProfileBiography);

router.get('/:username', getUserByName);




module.exports = router;