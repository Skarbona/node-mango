const bcrypt = require('bcrypt');

const hash = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt)
};

const compareHash = async (reqPass, dbPass) => bcrypt.compare(reqPass, dbPass);

module.exports = {
    hash,
    compareHash
};