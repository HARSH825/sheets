const mongoose = require('mongoose');

const fluidSchema = new mongoose.Schema({
  fluidType: String,
  brandName: String,
  grade: String,
  ratePerLiter: Number,
  usedFor: String
});

const staffMemberSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  specialist: String,
  photoLink: String,
  notes: String
});

const servicePriceSchema = new mongoose.Schema({
  serviceId: String,
  serviceName: String,
  isOffered: Boolean,
  hatchbackPrice: Number,
  sedanPrice: Number,
  suvPrice: Number,
  duration: Number // in minutes
});

const garageSchema = new mongoose.Schema({
  garageName: String,
  ownerName: String,
  phoneNumber1: String,
  phoneNumber2: String,
  whatsappNumber: String,
  pincode: String,
  operatingHours: String,
  weeklyOff: String,
  workshopType: String,
  gstNumber: String,
  panNumber: String,
  dateOnboarded: Date,
  referredBy: String,
  mechHelpContact: String,
  workshopAddress: String,
  
  yearEstablished: String,
  foundedBy: String,
  inspiration: String,
  growthJourney: String,
  challengesFaced: String,
  milestones: String,
  visionValues: String,
  
  fluids: [fluidSchema],
  
  staffMembers: [staffMemberSchema],
  
  isPickDropAvailable: Boolean,
  pickDropType: String, 
  pickDropCharges: String,
  serviceArea: String,
  
  upiId: String,
  bankAccountNumber: String,
  ifscCode: String,
  billingFrequency: String,
  preferredPaymentMode: String,
  
  services: [servicePriceSchema],
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

garageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Garage', garageSchema);