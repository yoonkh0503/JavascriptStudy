const USER_LIST = "USER_LIST";
const userArr = [];
const memberSet = document.querySelector("#memberSet");

memberSet.addEventListener('click', function(target) {
    target.preventDefault();
    const id = document.querySelector("#id");
    const nickName = document.querySelector("#nickName");
    const money = document.querySelector("#money");

    if(isIdCheck(id.value)) {
        const userObj = {
            id : id.value,
            nickName : nickName.value,
            money : money.value,
        };
        userArr.push(userObj);
        localStorage.setItem(USER_LIST, JSON.stringify(userArr));

        id.value = '';
        nickName.value = '';
        money.value = '';
        return alert("회원가입 되었습니다.");
    }
    else {
        return alert("중복된 아이디가 있습니다. 다시 확인해주세요.");
    }
});

const isIdCheck = function(inputId) {
    const userList = JSON.parse(localStorage.getItem(USER_LIST));
    
    for(let i = 0; i < userList.length; i++) {
        console.log("userList", userList[i].id);
        if(userList[i].id === inputId) {
            return false;
        }
    }
    return true;
}