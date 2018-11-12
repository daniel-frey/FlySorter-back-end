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
});

const Part = module.exports = mongoose.model('part', partSchema);
