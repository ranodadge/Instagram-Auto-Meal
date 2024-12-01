const fs = require('fs');
const FLAG_FILE = 'json/FLAG.json';

function setFlag(i) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - i);
    const flag = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        date: currentDate.getDate(),
    };
    fs.writeFileSync(FLAG_FILE, JSON.stringify(flag, null, ' '), 'utf8');
}

function getFlag(){
    if (fs.existsSync(FLAG_FILE)) {
        const data = fs.readFileSync(FLAG_FILE, 'utf8');
        const flag = JSON.parse(data);
        const currentDate = new Date();
        return flag.year === currentDate.getFullYear() && flag.month === currentDate.getMonth() && flag.date === currentDate.getDate();
    }
    return false;
}

module.exports = {
    setFlag,
    getFlag
}