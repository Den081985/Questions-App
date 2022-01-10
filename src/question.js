//класс для группировки методов,относящихся к вопросам

export class Question {
  //метод для запроса на сервер
  static create(question) {
    //questions.json-коллекция с json(обязательно указывается расширение)
    return fetch(
      "https://questions-app-b36af-default-rtdb.firebaseio.com/questions.json",
      {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        question.id = response.name; //name поле получаем с ответом с сервера и присваиваем его как id вопроса
        return question;
      })
      .then((question) => addToStorage(question))
      .then(Question.render);
  }
  //Метод для рендеринга вопросов на странице
  static render() {
    const questions = getElementFromStorage();
    const html = questions.length
      ? questions.map(toRender).join("")
      : `<div class="mui--text-headline">Вопросов нет</div>`;
    const list = document.getElementById("list");
    list.innerHTML = html;
  }
}

// функция для добавления вопросов в LocalStorage
function addToStorage(question) {
  const elements = getElementFromStorage();
  elements.push(question);
  localStorage.setItem("question", JSON.stringify(elements));
}

//функция для получения вопросов из LocalStorage

function getElementFromStorage() {
  return JSON.parse(localStorage.getItem("question") || "[]");
}
//формирования шаблонной строки для рендеринга вопросов
function toRender(question) {
  return `
    <div class="mui--text-black-54">
       ${new Date(question.date).toLocaleDateString()} 
       ${new Date(question.date).toLocaleTimeString()} 
    </div>
  <div>${question.text}</div> 
  <br /> 
    
    `;
}
