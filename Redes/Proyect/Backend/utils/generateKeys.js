const crypto = require('crypto');
const sshpk = require('sshpk');
const fs = require('fs');

let privKey;
let pubKey;

const certificateKeyPath = "certs/pubkey.pem";
const privateKeyPath = "certs/domain.key"

// init function, so we can reuse the keys
function init() {
    try {
        const eprivateKey = fs.readFileSync(privateKeyPath, 'utf8');
        privKey =  sshpk.parsePrivateKey(eprivateKey, "auto", { passphrase: process.env.PRIVKEY_PASS }).toBuffer("pkcs8")
        pubKey = fs.readFileSync(certificateKeyPath, 'utf8');
    } catch (e) {
        console.log(e.message)
        throw new Error("Error reading keys")
    }
}
// Will mainly be used with aes-256-cbc, keyLength = 32, ivLength = 16
function generateKeyIV(config) {
    const key = crypto.publicEncrypt(pubKey.toString("utf8"), crypto.randomBytes(config.keyLength) ).toString("hex")
    const iv =  crypto.publicEncrypt(pubKey.toString("utf8"), crypto.randomBytes(config.ivLength) ).toString("hex")
    return { key, iv };
}

function encryptFile(file, key, iv) {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    const encrypted = cipher.update(file, "utf8") 
    return encrypted;
}

function decryptFile(file, key, iv) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
    const decrypted = decipher.update(file, "utf8")
    return decrypted;
}

function decryptKey(ekey, eiv) {
    const key = crypto.privateDecrypt(privKey, Buffer.from(ekey, "hex"))
    const iv  = crypto.privateDecrypt(privKey, Buffer.from(eiv, "hex"))

    console.log(key, iv)
    return { key, iv };
}

module.exports = {
    generateKeyIV,
    encryptFile,
    decryptFile,
    decryptKey,
    init
}