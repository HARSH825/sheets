const express = require('express');
const router = express.Router();
const garageController = require('../controllers/garageController');

router.post('/', garageController.registerGarage);
router.get('/', garageController.getAllGarages);
router.get('/:id', garageController.getGarageById);
// router.put('/:id', garageController.updateGarage);
// router.delete('/:id', garageController.deleteGarage);

module.exports = router;