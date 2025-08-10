
const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require("crypto");
const assert = require("assert");

// generate a public-private key pair using RSA
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
	modulusLength: 4096,
	publicKeyEncoding: {
		type: "spki", // standard format for storing public key information
		format: "pem", // the container file format for the generated public key
	},
	privateKeyEncoding: {
		type: "pkcs8", // standard format for storing private key information
		format: "pem", // the container file format for the generated private key
	},
});

// create and encrypt a message using the public key
const originalMessage = "1234567890"
const encryptedMessage = publicEncrypt(publicKey, Buffer.from(originalMessage, "utf-8"))

// decrypt the message using the corresponding private key
const decryptedMessage = privateDecrypt(privateKey, encryptedMessage).toString()

// assert that the original and decrypted messages are identical
assert.equal(originalMessage, decryptedMessage)
