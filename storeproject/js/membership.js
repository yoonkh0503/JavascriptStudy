const USER_LIST = "USER_LIST";
const memberSet = document.querySelector("#memberSet");

memberSet.addEventListener('click', function(target) {
    target.preventDefault();
    let userArr = JSON.parse(localStorage.getItem(USER_LIST));

    if(userArr === null) {
        userArr = [];
    }

    const id = document.querySelector("#id");
    const nickName = document.querySelector("#nickName");
    const money = document.querySelector("#money");

    if(userArr.length !== 0) {
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
    }
    else {
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
};