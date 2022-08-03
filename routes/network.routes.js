const { Router } = require('express');
const { check } = require('express-validator');
const { validator } = require('../middleware/validator');

const {getSocialNetworks, createSocialNetwork, deleteSocialNetwork} = require('../controllers/network.controller');

const router = Router();

router.get('/', getSocialNetworks);
router.post('/create-socialnetwork', validator, createSocialNetwork);
router.post('/delete-socialnetwork/:id', validator, deleteSocialNetwork);

module.exports = router;