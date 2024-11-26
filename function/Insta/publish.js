require('dotenv').config();
const fs = require('fs');
const { IgApiClient } = require('instagram-private-api');
const { login } = require('./login');
const { drawmenu } = require('./drawmenu');
const { datetoday } = require('./date');
const { successlog, errorlog } = require('./webhook');
const { setFlag } = require('./flagcheck');

async function publish(choice){
    try{
        const instagram = await login();

        const today = new Date();
        today.setDate(today.getDate() + choice);

        await drawmenu(choice);

        let item = [];
        let buffer = [];
        for(i = 1; i < 4; i++){
            buffer.push(fs.readFileSync(`photo/menu/mealImage${i}.jpg`));
            item.push({ width: 1080, height: 1080, file: buffer[i - 1] });
        }

        await instagram.publish.album({
            items: item,
            caption: `${datetoday(today)} 급식입니다.  \n\n #DDSHS #학생회주도 #급식 #조식 #중식 #석식`,
        });

        console.log("게시물이 성공적으로 올라갔습니다.");
        successlog(buffer);
        setFlag();
    } catch(e){
        console.error("에러 발생", e);
        errorlog(e);
    }
}

module.exports = {
    publish
}