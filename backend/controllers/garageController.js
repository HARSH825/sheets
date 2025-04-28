const Garage = require('../models/garageModel');

exports.registerGarage = async (req, res) => {
  try {
    const garage = new Garage(req.body);
    const savedGarage = await garage.save();
    res.status(201).json({
      success: true,
      message: 'Garage registered successfully',
      data: savedGarage
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error registering garage',
      error: error.message
    });
  }
};

exports.getAllGarages = async (req, res) => {
  try {
    const garages = await Garage.find();
    res.status(200).json({
      success: true,
      count: garages.length,
      data: garages
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error fetching garages',
      error: error.message
    });
  }
};

exports.getGarageById = async (req, res) => {
  try {
    const garage = await Garage.findById(req.params.id);
    if (!garage) {
      return res.status(404).json({
        success: false,
        message: 'Garage not found'
      });
    }
    res.status(200).json({
      success: true,
      data: garage
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error fetching garage',
      error: error.message
    });
  }
};

exports.updateGarage = async (req, res) => {
  try {
    const garage = await Garage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!garage) {
      return res.status(404).json({
        success: false,
        message: 'Garage not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Garage updated successfully',
      data: garage
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating garage',
      error: error.message
    });
  }
};

exports.deleteGarage = async (req, res) => {
  try {
    const garage = await Garage.findByIdAndDelete(req.params.id);
    
    if (!garage) {
      return res.status(404).json({
        success: false,
        message: 'Garage not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Garage deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting garage',
      error: error.message
    });
  }
};