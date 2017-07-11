let mongoose = require('mongoose');
let Schema = mongoose.Schema;
module.exports = (mongoose) => {

  let ClientSchema = new Schema({
    companyName: {
      type: String,
      required: [false, ' is required.']
    },
    address: {
      type: String,
      required: [false, ' is required.']
    },
    state: {
      type: String,
      required: [false, ' is required.']
    },
    city: {
      type: String,
      required: [false, ' is required.']
    },
    pincode: {
      type: Number,
      required: [false, ' is required.']
    },
    email: {
      type: String,
      required: [false, ' is required.']
    },
    ownerName: {
      type: String,
      required: [false, ' is required.']
    },
    mobile1: {
      type: String,
      required: [false, ' is required.']
    },
    mobile2: {
      type: String,
      required: [false, ' is required.']
    },
    landline: {
      type: String,
      required: [false, ' is required.']
    },
    panNo: {
      type: String,
      required: [false, ' is required.']
    },
    tinNo: {
      type: String,
      required: [false, ' is required.']
    },
    GSTNo: {
      type: String,
      required: [false, ' is required.']
    },
    password: {
      type: String,
      required: [false, ' is required.']
    }
  }, { timestamps: true }, { strict: true });
  return mongoose.model('Client', ClientSchema);
};
