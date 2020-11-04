const add = require('../core');

describe('Проверка на добавление элемента в список', ()=>{
  it('Элемент должен быть добавлен', ()=>{
    let todo = new ToDo();
    let item = {
      "publishing": "Anastasie Arnall",
      "book-title": "Atomic Brain, The",
      "genre": "Horror|Sci-Fi",
      "book-year": "2020-11-04",
      "id": 1
    },
    const done = todo.addTodo(item)
    expect(todo.getItems().length).toBe(1);
  })
})