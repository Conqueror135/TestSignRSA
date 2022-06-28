const crypto = require('crypto-js');

const ciphertext = crypto.AES.encrypt('my message', 'secret key 123').toString();
console.log(ciphertext);

var bytes  = crypto.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(crypto.enc.Utf8);

console.log(originalText);