require('dotenv').config();
const fs = require('fs');
const { IgApiClient } = require('instagram-private-api');
const { login } = require('./login');
const { drawmenu } = require('./writemenu');
const { datetoday } = require('./date');
const { successlog, errorlog } = require('./webhook');

async function publish(choice){
    try{
        const instagram = await login();
        await drawmenu(choice);

        const imageBuffer1 = fs.readFileSync(`photo/menu/mealImage1.jpg`);
        const imageBuffer2 = fs.readFileSync(`photo/menu/mealImage2.jpg`);
        const imageBuffer3 = fs.readFileSync(`photo/menu/mealImage3.jpg`);

        await instagram.publish.album({
            items: [
              { width: 1080, height: 1080, file: imageBuffer1 },
              { width: 1080, height: 1080, file: imageBuffer2 },
              { width: 1080, height: 1080, file: imageBuffer3 },
            ],
            caption: `${datetoday(
              today
            )} 급식입니다.  \n\n #DDSHS #학생회주도 #급식 #조식 #중식 #석식`, // nice caption (optional)
        });
    } catch(e){
        console.error("에러 발생", e);
        errorlog(e);
    }
    
}