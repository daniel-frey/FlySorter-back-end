'use strict';

const mongoose = require('mongoose');

const partSchema = mongoose.Schema({
  partId: {
    type: Number,
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
    type: Number,
    required: true,
  },
  partCategory: {
    type: Number,
    required: true,
  },
  partLocation: {
    type: Number,
    required: true,
  },
  partCount: {
    type: Number,
  },
  partLongLead: {
    type: Boolean,
  },
  partNotes: {
    type: String,
  },
});
