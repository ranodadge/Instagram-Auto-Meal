// 나이스 Request용
function formatDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
  
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
  
    return `${year}${month}${day}`;
  }

  // 사진 게시용
  function datetoday(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = getDayOfWeek(date);
  
    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
  }
  
  //날짜
  function getDayOfWeek(date) {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const day = days[date.getDay()];
    return day;
  }

module.exports = {
    formatDate,
    datetoday,
    getDayOfWeek
}