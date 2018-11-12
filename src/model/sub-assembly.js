'use strict';

const mongoose = require('mongoose');

const subAssemblySchema = mongoose.Schema({
  subId: {
    type: String,
    unique: true,
    required: true,
  },
  subPart: {
    type: String,
    required: true,
  },
  subVersion: {
    type: String,
  },
  subQuantity: {
    type: String,
  },
  subMinutes: {
    type: String,
  },
  // TOM: This connects the
  parts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'part',
    },
  ],
},
{
  usePushEach: true,
});

module.exports = mongoose.model('subAssembly', subAssemblySchema);