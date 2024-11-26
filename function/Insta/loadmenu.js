require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { formatDate } = require('./date');
const file = ['json/morning.json', 'json/launch.json', 'json/dinner.json'];

async function getMeal(choice){
    const today = new Date();
    today.setDate(today.getDate() + choice);
    for(let time = 1; time < 4; time++){
        let meal = await fetchMealInfo(time, today);
        meal = JSON.stringify(meal, null, ' ')
        fs.writeFileSync(file[time - 1], meal, 'utf-8')
    }
}

async function fetchMealInfo(time, today) {
    const dayOfWeek = today.getDay();
  
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return [];
    }
  
    const url = "https://open.neis.go.kr/hub/mealServiceDietInfo";
    const params = {
      KEY: process.env.key,
      Type: "json",
      ATPT_OFCDC_SC_CODE: "G10",
      SD_SCHUL_CODE: "7430295",
      MMEAL_SC_CODE: time,
      MLSV_FROM_YMD: formatDate(today),
      MLSV_TO_YMD: formatDate(today),
    };
  
    try {
      const response = await axios.get(url, { params });
      if (response.data && response.data.mealServiceDietInfo[1]) {
        return response.data.mealServiceDietInfo[1].row.map((meal) => {
          meal.DDISH_NM = meal.DDISH_NM.replace(/\s*\([^)]*\)\s*/g, "");
          meal.DDISH_NM = meal.DDISH_NM.replace(/<br\/>/g, "\n\n");
          return meal;
        });
      } else {
        return [];
      }
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
      return [];
    }
  }


  module.exports = {
    getMeal
  }
