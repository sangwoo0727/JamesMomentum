const dayArr=["MON","TUE","WED","THR","FRI","SAT","SUN"];
//아래 두문장은 css선택자를 이용하여 DOM을 조작하는 것
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector(".clock-text");
//위의 clockTitle 문장은 아래와 같이 써도된다.
//const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    //console.log(date);
    const day = dayArr[date.getDay()-1];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    //요일, 시간, 분, 초에 대한 값을 받아왔다.
    //console.log(`${day} ${hours} ${minutes} ${seconds}`);
    //innertText와 innerHTML 차이점 생각해보기
    clockTitle.innerText = `${hours < 10? `0${hours}`: hours} : ${
        minutes < 10? `0${minutes}` : minutes } : ${
            seconds < 10? `0${seconds}`: seconds}  ${day}`;
}
function init(){
    //현재 시간을 얻는 것이 가장 중요하겠지?
    getTime(); //시간을 얻는 함수 getTime()! , 항상 모듈화시키며 쪼개자!
    setInterval(getTime,1000); //1초마다 함수 호출!
}

init();