// Задание
// Получить пользователей (users) от сервера https://jsonplaceholder.typicode.com/users.
// Вывести имена пользователей на страницу на боковой панели, как вертикальное меню.
// В основной части (справа от бокового меню) изначально показывается информация о первом пользователе.
// При клике на имя пользователя на боковой панели -  в основной части информация меняется на выбранного пользователя.
// Для оформления использовать Bootstrap компонент Card:
// - для списка пользователей - шаблон Links and buttons - вариант с кнопками
// https://getbootstrap.com/docs/5.1/components/card/#list-groups
// - для отображения информации о пользователе - шаблон карточки без изображения.
// Нужно отобразить имя, ник, место проживания, компанию и email (как ссылку вида mailto:)
// ПРИМЕР, как должно получиться.
const userList = document.querySelector(".user-list"),
nameUser = document.querySelector(".card-title"),
username = document.querySelector(".card-text"),
street = document.querySelector(".street"),
suite = document.querySelector(".suite"),
city = document.querySelector(".city"),
zip = document.querySelector(".zip"),
company = document.querySelector(".company"),
email = document.querySelector(".card-link"),
card = document.querySelector(".user-info");

const url = "https://jsonplaceholder.typicode.com/users";

class UserInfo {
    constructor(url){
        this.url = url;
    }
    async getUserInfo(){
        const response = await fetch(this.url); 
        const data = await response.json(); 
        getCard(data[0]);
        for (let i = 0; i < data.length; i++){
            const userItem = document.createElement("li");
            userItem.innerText = data[i].name;
            userItem.className = "list-group-item";
            userList.appendChild(userItem);
            
            let userLi = userList.children[i];
            userLi.addEventListener("click", (event)=>{
                event.preventDefault();
                document.querySelectorAll(".list-group-item").forEach(li => {
                    li.classList.remove("active");
                });
                userLi.classList.add("active");
                getCard(data[i]);
            });
            
        };
        function getCard(dataCard) {
            nameUser.innerText = dataCard.name;
            username.innerText = dataCard.username;
            street.innerText = "Street: " + dataCard.address.street;
            suite.innerText = "Suite: " + dataCard.address.suite;
            city.innerText = "City: " + dataCard.address.city;
            zip.innerText = "Zipcode: " + dataCard.address.zipcode;
            company.innerText = dataCard.company.name;
            email.href = "mailto:" + dataCard.email.toLowerCase();
        };
        return data;
    }
}

function getUserList(){
    const usersData = new UserInfo(url);
    usersData.getUserInfo();
}

getUserList();