require('dotenv').config();
const { IgApiClient } = require("instagram-private-api");
const instagram = new IgApiClient();

async function login() {
    await instagram.state.generateDevice(process.env.id);
    await instagram.account.login(process.env.id, process.env.password);
    return instagram;
}

module.exports = {
    login
}