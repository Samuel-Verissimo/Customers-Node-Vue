const express = require('express');
const ClientController = require('../controllers/clientController');
const router = express.Router();

router.post('/', ClientController.create);
router.get('/', ClientController.list);
router.get('/:id', ClientController.getOne);
router.put('/:id', ClientController.update);
router.delete('/:id', ClientController.delete);

module.exports = router;
