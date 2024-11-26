const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require('fs');
const path = require('path');
const file = ['json/morning.json', 'json/launch.json', 'json/dinner.json'];
const plain = ['photo/plain/menu1.jpg', 'photo/plain/menu2.jpg', 'photo/plain/menu3.jpg'];
const { datetoday } = require('./date');
const { getMeal } = require('./loadmenu')

async function drawmenu(choice){
    const today = new Date();
    await getMeal(choice);
    today.setDate(today.getDate() + choice);
    for(let time = 1; time < 4; time++){
        await drawTextOnImage(time, today);
    }
}

async function drawTextOnImage(time, today) {
    try{
        const mealFile = fs.readFileSync(file[time - 1], 'utf8');
        const mealInfo = JSON.parse(mealFile);
        if(time == 3 && today.getDay() == 5){
            const canvas = createCanvas(1080, 1080);
            const ctx = canvas.getContext("2d");

            const backgroundImage = await loadImage("photo/plain/mealImage3F.jpg");
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

            const buffer = canvas.toBuffer("image/jpeg");
            fs.writeFileSync("photo/menu/mealImage3.jpg", buffer);

            return 0;
        }
        registerFont("font/AggroBold.ttf", {
        family: "AggroBold",
        });
    
        const canvas = createCanvas(1080, 1080);
        const ctx = canvas.getContext("2d");
    
        const backgroundImage = await loadImage(`photo/plain/menu${time}.jpg`);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
        ctx.font = '55px "AggroBold"';
    
        mealInfo.forEach((meal, index) => {
        const mealItems = meal.DDISH_NM.split(/\n\s*/);
    
        const text1 = mealItems.slice(0, 6).join("\n\n");
        const text2 = mealItems.slice(6).join("\n\n");
    
        let menuline = 300;
    
        if (time === 1) ctx.fillStyle = "#5E8EB4";
        else if (time === 2) ctx.fillStyle = "#0043A8";
        else if (time === 3) ctx.fillStyle = "#093373";
    
        ctx.fillText(`${text1}`, 60, menuline + index * 400);
        ctx.fillText(`${text2}`, 520, menuline + index * 400);
    
        ctx.font = '40px "AggroBold"';
        ctx.fillText(`칼로리: ${meal.CAL_INFO}`, 550, 1010 + index * 1010);
    
        let when;
        if (time === 1) when = "오늘의 조식 목록";
        else if (time === 2) when = "오늘의 중식 목록";
        else if (time === 3) when = "오늘의 석식 목록";
    
        ctx.font = '32px "AggroBold"';
        ctx.fillStyle = "#000000";
    
        ctx.fillText(`${datetoday(today)}`, 620, 90 + index * 90);
        ctx.fillText(`${when}`, 695, 140 + index * 140);
        });
    
        const buffer = canvas.toBuffer("image/jpeg");
        fs.writeFileSync(`photo/menu/mealImage${time}.jpg`, buffer);
    } catch(error){
        console.log(error);
    }
  }

  module.exports = {
    drawmenu
  }