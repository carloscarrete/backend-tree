const { Router } = require('express');
const { check } = require('express-validator');
const { validator } = require('../middleware/validator');
const { validateToken } = require('../middleware/validateJwt');

const {getSocialNetworks, createSocialNetwork, deleteSocialNetwork, updateSocialNetwork} = require('../controllers/network.controller');

const router = Router();

router.get('/', getSocialNetworks);
router.post('/', validateToken, createSocialNetwork);
router.delete('/:id', validateToken, deleteSocialNetwork);
router.put('/:id', validateToken, updateSocialNetwork);

module.exports = router;