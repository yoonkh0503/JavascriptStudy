const USER_LIST = "USER_LIST";
const userArr = [];
const memberSet = document.querySelector("#memberSet");

memberSet.addEventListener('click', function(target) {
    target.preventDefault();
    const id = document.querySelector("#id");
    const nickName = document.querySelector("#nickName");
    const money = document.querySelector("#money");

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
    alert("회원가입 되었습니다.");

})