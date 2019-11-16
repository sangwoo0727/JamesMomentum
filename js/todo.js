

function loadToDos(){
    const loadedToDos = localStorage.getItem("toDos");
    // 로컬 스토리지에서 먼저 toDos 목록을 가져온다.
    // toDos 목록은 
    if(loadedToDos === null){
        
    }
}
function start(){
    loadToDos();
}

start();