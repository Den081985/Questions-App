import { isValid } from "./utils";
import { Question } from "./question";
import { createModal } from "./utils";
import "./styles.css";
import { getAuthHtml, authWithEmailAndPassword } from "../auth";

const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const submit = form.querySelector("#submit");
const modBtn = document.getElementById("mod-btn");
//обработчик для события load у объекта window для рендеринга списка вопросов при перезагрузке страницы
window.addEventListener("load", Question.render);

form.addEventListener("submit", submitHandler);
//блокировка кнопки при недостаточном количестве символов
input.addEventListener("input", () => {
  submit.disabled = !isValid(input.value);
});
//рендеринг модального окна при клике
modBtn.addEventListener("click", openModal);

//функция срабатывает на событие submit
function submitHandler(event) {
  event.preventDefault();

  //проверка валидности входных данных:если кол-во символов больше или равно 10,
  //создаем объект  question с полями text = входные значение без пробелов(trim) и
  //дата в формате json
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };
    //пока выполняется запрос блокировка кнопки
    submit.disabled = true;
    //Асинхронный запрос на сервер,чтобы сохранить question
    Question.create(question).then(() => {
      input.value = "";
      input.className = "";
      submit.disabled = false;
    });
  }
}
//функция для вывода модального окна авторизации
//параметр { once: true } служит для того,чтобы данное событие было вызвано только один раз
function openModal() {
  createModal("Авторизация", getAuthHtml());
  document
    .getElementById("auth-form")
    .addEventListener("submit", authFormHandler, { once: true });
}
//функция, контролирующая поведение формы авторизации
function authFormHandler(event) {
  event.preventDefault();
  //сохраняем в константы значения данных,введенных в поля формы
  const btn = event.target.querySelector("#submit-btn");
  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;

  btn.disabled = true;

  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false));
}
//функция для рендеринга модального окна после авторизации
function renderModalAfterAuth(content) {
  //при ошибке запроса на сервер вернется строка ошибки,при успешном ответе-массив
  //проверяем если вернулась строка-сообщаем об ошибке,если массив вопросов-рендерим вопросы
  if (typeof content === "string") {
    createModal("Ошибка", content);
  } else {
    createModal("Вопросы", Question.listToHTML(content));
  }
}
