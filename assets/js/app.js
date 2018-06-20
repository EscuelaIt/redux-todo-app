// import {createStore} from 'redux';

(function () {

  // your code

  const { createStore } = Redux;

  let store;

  const initialState = [
    {
      id: 1,
      completed: true,
      text: 'Task 1',
    },
    {
      id: 2,
      completed: false,
      text: 'Task 2',
    },
    {
      id: 3,
      completed: true,
      text: 'Task 3',
    },
  ];

  document.addEventListener("DOMContentLoaded", (event) => {
    initApp();  
  });

  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TASK':
        return [...state, action.payload];
      default:
        return state;
    }
  }

  function initApp() {
    store = createStore(
      reducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
    const $form = document.getElementById('form');
    $form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData($form);
      console.log(data.get('text'));
      const action = {
        type: 'ADD_TASK',
        payload: {
          id: 12,
          text: data.get('text'),
          completed: false
        }
      };
      store.dispatch(action);
      const $input = document.getElementById('new-todo');
      $input.value = "";
    });
    store.subscribe(handleChange);
    render();
  }

  function handleChange() {
    render();
  }

  function render() {
    const todos = store.getState();
    renderTodos(todos);
  }

  function renderTodos(todos) {
    const $container = document.getElementById('todo-list');
    $container.innerHTML = '';

    let todosHtml = '';
    todos.forEach(todo => {
      todosHtml += renderTodo(todo);
    });
    $container.innerHTML = todosHtml;
  }

  function renderTodo(todo) {
    return `
    <li data-id="${todo.id}" class="${todo.completed}">
      <div class="view">
        <input class="toggle" type="checkbox" ${todo.completed ? 'checked': ''}>
        <label>${todo.text}</label>
        <button class="destroy"></button>
      </div>
    </li>`;
  }
	
})();