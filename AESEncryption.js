const CryptoJS = require("crypto-js");

let AesUtil = function (keySize, iterationCount) {
  this.keySize = keySize / 32;
  this.iterationCount = iterationCount;
};

AesUtil.prototype.generateKey = function (salt, passPhrase) {
  let key = CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), {
    keySize: 128 / 32,
    iterations: this.iterationCount,
  });
  return key;
};

AesUtil.prototype.encrypt = function (salt, iv, passPhrase, plainText) {
  let key = this.generateKey(salt, passPhrase);
  let encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: CryptoJS.enc.Hex.parse(iv),
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

AesUtil.prototype.decrypt = function (salt, iv, passPhrase, cipherText) {
  let key = this.generateKey(salt, passPhrase);
  let cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText),
  });
  let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: CryptoJS.enc.Hex.parse(iv),
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

let aesUtil = new AesUtil(128, 1000);

//Generated iv and salt
let iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
let salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);

//encrypt
console.log(
  aesUtil.encrypt(
    "", //salt
    "", //iv
    "", //key
    "" //text
  )
);

//decrypt
console.log(
  aesUtil.decrypt(
    "", //salt
    "", //iv
    "", //key
    "" //cyphertext
  )
);
