'use strict';

const mongoose = require('mongoose');

const partSchema = mongoose.Schema({
  partId: {
    type: String,
    unique: true,
    required: true,
  },
  partDescription: {
    type: String,
  },
  partSub: {
    type: Boolean,
    required: true,
  },
  partSrc: {
    type: String,
    required: true,
  },
  partMfgNum: {
    type: String,
  },
  partPrice: {
    type: String,
    required: true,
  },
  partCategory: {
    type: String,
    required: true,
  },
  partLocation: {
    type: String,
    required: true,
  },
  partCount: {
    type: String,
  },
  partLongLead: {
    type: Boolean,
  },
  partNotes: {
    type: String,
  },
  // TOM: This connects the parts to the subAssembly
  subAssembly: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'subAssembly',
  },
});

const Part = module.exports = mongoose.model('part', partSchema);

Part.create = (
  partId,
  partDescription,
  partSub,
  partSrc,
  partMfgNum,
  partPrice,
  partCategory,
  partLocation,
  partCount,
  partLongLead,
  partNotes,
) => {
  return new Part({
    partId,
    partDescription,
    partSub,
    partSrc,
    partMfgNum,
    partPrice,
    partCategory,
    partLocation,
    partCount,
    partLongLead,
    partNotes,
  }).save();
};
