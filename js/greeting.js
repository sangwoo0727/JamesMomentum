const nameContainer = document.querySelector(".js-greeting");
const delContainer = document.querySelector(".js-delBtn");


function delFunc(event){
    localStorage.removeItem("username");
    setTimeout(function(){
        location.reload();
    },100);
}

function restart(){
    
}
function nameShow(name){
    //로컬스토리지에 저장된 값을 꺼내와서 보여주는 함수!
    nameContainer.innerHTML ="";
    delContainer.innerHTML ="";
    const title = document.createElement("div")
    //span 태그는 inline text container 즉, 문장 단위로 텍스트 영역을 지정하는 것
    // 그 자체로는 아무 역할도 하지 않고, css 스타일을 지정할 때 사용한다.
    // div 태그와 역할이 비슷하지만, div는 사각형 박스 모양으로 구역을 지정하고, span은 한 문장 단위
    const delBtn = document.createElement("div");
    delBtn.className ="css__btn"
    delBtn.innerHTML =" &nbsp; ✖&nbsp;&nbsp;   Click to Rename!";
    title.className = "name__text";
    title.innerHTML = `Hello , ${name} !`;
    nameContainer.appendChild(title); //동적으로 추가해주는 명령어
    delContainer.appendChild(delBtn);
    delBtn.addEventListener("click",delFunc);
}

function handleSubmit(event){
    event.preventDefault();
    //현재 이벤트의 기본 동작을 중단한다.
    // 즉 submit 후 하고싶은것을 적어주면 된다.
    const form = event.target; //이벤트 객체를 받아오는 명령어
    const input = form.querySelector("input");
    const value = input.value;
    localStorage.setItem("username",value); // 로컬스토리지에 키값은 username , 데이터 값은 value값으로 저장한다.
    //이제는 로컬스토리지에 값이 있지?
    //그러면 loadName에서 한대로 nameShow()를 보여주면 되지!
    nameShow(value);
}
function nameInput(){
    const input = document.createElement("input");
    //위의 문장은 html 요소를 추가하는 명령어
    // 즉 input태그를 추가해라!
    input.placeholder = "Type your name!"; //input에 들어갈 힌트
    input.type = "text";
    input.className = "name__input";
    const form = document.createElement("form");
    form.appendChild(input);
    nameContainer.appendChild(form);
    //addEventListener는 이벤트를 등록하는 가장 권장되는 방식
    //document 내에 특정 요소에 event를 등록할 때 사용한다.
    //이 방식을 사용하면 여러 개의 이벤트 핸들러를 등록할 수 있다.
    form.addEventListener("submit",handleSubmit); //전송이벤트가 발생할때, handleSubmit 함수 실행!
    
}
function loadName(){
    // localstorage에 데이터 있으면 그대로 보여주기
    // 없으면 새로 입력받아서 만들기.
    const name = localStorage.getItem("username");
    if(name === null){
        nameInput(); //데이터가 없다면 인풋!
    }else{
        nameShow(name); //데이터가 있다면 보여주기!
    }
}
function start(){
    loadName();
}

start(); //항상 모듈 단위로 구분지어 만들기 때문에 이런식으로 시작하는 것이 좋다