require('dotenv').config();
const fs = require('fs');
const { IgApiClient } = require('instagram-private-api');
const { login } = require('./login');
const { drawmenu } = require('./writemenu');
const { sendwebhook } = require('./webhook');

async function publish(choice){
    try{
        const instagram = await login();
        await drawmenu(choice);
    } catch(e){
        
    }
    
}