'use strict';

// =======================================================
// Tom: Left out email in account schema, not sure if needed. Maybe if password needs
// to be reset. Also, are we doing account hierarchy?
// =======================================================

const mongoose = require('mongoose');
const crypto = require('crypto');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const TOKEN_SEED_LENGTH = 128;

const accountSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  tokenSeed: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  recoveryHash: {
    type: String,
    required: true,
  },
  recoveryQuestion: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: boolean,
    required: true,
  }
});

function pCreateToken() {
  this.tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
  return this.save()
    .then((account) => {
      return jsonWebToken.sign({
        tokenSeed: account.tokenSeed,
      }, process.env.SECRET);
      })
    .catch((error) => {
    throw error;
    });
}

function pValidatePassword(unhashedPassword) {
  return bcrypt.compare(unhashedPassword, this.passwordHash)
    .then((compareResult) => {
      if (!compareResult) {
        throw new Error('error');
      }
      return this;
    })
    .catch(console.error);
}

accountSchema.methods.pCreateToken = pCreateToken;
accountSchema.methods.pValidatePassword = pValidatePassword;

const Account = module.exports = mongoose.model('account', accountSchema);
const HASH_ROUNDS = 10;

Account.create = (username, password, recoveryAnswer) => {
  return bcrypt.hash(password, HASH_ROUNDS)
    .then((passwordHash) => {
      password = null;
      const tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
      return bcrypt.hash(recoveryAnswer, HASH_ROUNDS)
        .then((recoveryHash) => {
          return new Account({
            username,
            tokenSeed,
            passwordHash,
            recoveryHash,
          }).save();
        })
    });
};
