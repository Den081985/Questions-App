import { isValid } from "./utils";
import { Question } from "./question";
import "./styles.css";

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

function openModal() {}
