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
  //функция для работы с idToken,полученным с сервера
  //c помощью fetch получаем список всех вопросов с сервера
  static fetch(token) {
    if (!token) {
      return Promise.resolve("<p class ='error'>У Вас нет токена</p>");
    }
    return fetch(
      `https://questions-app-b36af-default-rtdb.firebaseio.com/questions.json?auth=${token}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          return `<p class ='error'>${response.error}</p>`;
        }
        //Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
        //Метод Object.keys() возвращает массив из собственных перечисляемых свойств переданного объекта
        //получаем ключи из ответа и с помощью map создаем новый массив из объектов с всеми полями
        //response и id=key, если ответа нет возвращаем пустой массив
        return response //если ответ не пустой
          ? Object.keys(response).map((key) => ({
              ...response[key], //text, date
              id: key,
            }))
          : []; //если ответ пустой
      });
  }
  //метод для приведения списка вопросов к html
  static listToHTML(questions) {
    return questions.length
      ? `<ol>${questions
          .map((quest) => `<li>${quest.text}</li>`) //map вернет массив,чтобы преобразовать его в строку используем join("")
          .join("")}</ol>`
      : "<p>Вопросов нет</p>";
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
