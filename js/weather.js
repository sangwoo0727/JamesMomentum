const API_KEY ="2c9c48ddb50237d54e0024db6eb3da51";
const WEATEHR_API = "https://api.openweathermap.org/data/2.5/weather?";
const weather = document.querySelector(".js-weather .weather__text");


function getWeather(coords){
    fetch(//fetch에 대해서는 아직까지 자세하게 공부하지는 못하였지만 네트워크에서 JSON 파일을 가져와서 콘솔에 인쇄한다.
        //사용 흐름은 인수 한개를 가져오고 응답을 포함하는 약속(Response 개체)를 반환하는 것.
        `${WEATEHR_API}lat=${coords.lat}&lon=${coords.lng}&appid=${API_KEY}&units=metric`
        //units=metric은 api 홈페이지에서 섭씨온도를 사용하고 싶을 때 저렇게 단위변경하라고 써있었다.
    )
    //then을 사용하는 것은 fetch가 완료될때 까지 기다리겠다는 것이다. then을 하지 않고 그냥 아래에 fetch 밖에 원하는 명령어를 입력하면,
    // fetch가 완료되지 않은 상태로 새로운 명령어가 실행될 수도 있다.
    .then(function(response){
      return response.json();  
    }) //response는 단순한 HTTP Response일뿐 실제 JSON이 아니기때문에 json메서드를 통해 바꿔주어야 한다.
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${place}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Math.floor(temperature)}°c`;
    });
}
function handleGeoSuccess(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const coords ={
        lat,
        lng
    };
    localStorage.setItem("coords", JSON.stringify(coords));
    //JSON.stringify(value,replacer,space)
    //value(필수) : json 문자열로 변환할 값이다.(배열,객체 등)
    //replacer(선택) : 함수 또는 배열이 될 수 있다. 이 값이 null이거나 제공되지 않으면, 객체의 모든 속성들이 JSON 문자열 결과에 포함된다.
    //coords 를 통해 이제 weather api를 사용하여 날씨를 받아와보자!
    getWeather(coords);
}
function handleGeoFailure(){
    console.log("Error");
}
function loadWeather(){
    const currentCoords = localStorage.getItem("coords"); //좌표 정보를 먼저 받아와야한다.
    // 좌표가 이동되더라도 계속해서 갱신되게
    if(currentCoords !== null){
        const parsedCoords = JSON.parse(currentCoords);
        getWeather(parsedCoords);
    }else{
        navigator.geolocation.getCurrentPosition(
            //navigator 객체는 window 객체의 프로퍼티로 브라우저의 정보를 제공하는 객체
            //navigator.geolocation API는 직접 웹에서도 위치정보를 수집할 수 있다.
            //이 API는 단말의 위도와 경도를 수집할 수 있는 인터페이스를 제공해준다.
            handleGeoSuccess,  //성공했을때
            handleGeoFailure //실패했을때
        );
    }
}

function startWeather(){
    loadWeather(); 
}
startWeather();