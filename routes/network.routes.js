const { Router } = require('express');
const { check } = require('express-validator');
const { validator } = require('../middleware/validator');

const {getSocialNetworks, createSocialNetwork} = require('../controllers/network.controller');

const router = Router();

router.get('/', getSocialNetworks);
router.post('/create-socialnetwork', validator, createSocialNetwork);

module.exports = router;