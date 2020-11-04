const fs = require('fs');

let booksList = [];
let activeId = null;
let indexActiveItem = null;
let isActiveEdit = false;

// Получение эл-в со страницы 
const form = document.getElementById('book-form');
const bookListRef = document.getElementById('booklist');

// Отображение данных в таблицу
function render() {
  let result = ``;
  booksList.forEach((element) => {
    result += `<tr onclick="setIndexActiveItem(${element['id']}, event)"><td>${element.publishing}</td><td>${element['book-title']}</td><td>${element.genre}</td><td>${element['book-year']}</td></tr>`;
  });

  bookListRef.innerHTML = result;
}

// Получение данных из файла
function getData() {
  if (fs.existsSync('BOOKS_DATA.json')) {
    // Чтение, если файл найден
    fs.readFile('BOOKS_DATA.json', 'utf8', (err, data) => {
      if (err) throw err;

      if (data && data.length) {
        booksList = JSON.parse(data);
        this.render();
      }
    });
  }
}

// Сохранение данных в файл
function saveDataInFile() {
  const books = JSON.stringify(books);
  fs.writeFile('BOOKS_DATA.json', books, (err, data) => {
    if (err) throw err;
  });
}

function submitForm() {
  const obj = {};

  // Заполнение значениями из формы
  for (const item of form) {
    // Проверка на пустое значение
    if (item.value) {
      obj[item['id']] = item.value;
    } else {
      return;
    }
  }

  // Замена элемента если включено редактирование
  if (isActiveEdit) {
    this.replaceItem(obj);
    return;
  }

  obj.id = booksList.length + 1;
  booksList.push(obj);

  this.clearForm();
  this.render();
}

function replaceItem(item) {
  item['id'] = activeId;
  booksList[indexActiveItem] = item;
  this.clearForm();
  this.render();
}

function editItem() {
  // Поиск элемента по id
  const activeItem = booksList.filter((el) => el['id'] === activeId);

  // Выход если нет элемента
  if (!activeItem.length) {
    return;
  }

  isActiveEdit = true;

  // Заполенние формы выбранным элементом
  for (const item of form) {
    item.value = activeItem[0][item['id']];
  }
}

function deleteItem() {
  // Выход если елемент не выбран
  if (indexActiveItem === null) {
    return;
  }
  booksList.splice(indexActiveItem, 1);
  indexActiveItem = null;

  this.clearForm();
  this.render();
}

function setIndexActiveItem(id, event) {
  activeId = id;
  indexActiveItem = this.findIndexById(booksList, id);
  isActiveEdit = false;

  this.clearForm();
  this.setStyleActiveItem(event);
}

function findIndexById(items, id) {
  return items.findIndex((item) => item['id'] === id);
}

// Очищение значений из формы
function clearForm() {
  for (const item of form) {
    item.value = '';
  }
}

// Подсветка активного элемента
function setStyleActiveItem(event) {
  const elements = document.getElementsByTagName('tr');

  if (elements && elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('bg-warning');
    }
  }
  event.target.parentElement.classList.add('bg-warning');
}

getData();
