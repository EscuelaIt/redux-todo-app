// import {createStore} from 'redux';

(function () {

  // your code

  const { createStore, combineReducers } = Redux;

  let store;

  const todos = [
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
    {
      id: 4,
      completed: true,
      text: 'Task 3',
    },
  ];

  const initialState = {
    todos,
    filter: 'ALL',
  };

  document.addEventListener("DOMContentLoaded", (event) => {
    initApp();  
  });

  const reducerFilter = (state = '', action) =>  {
    switch (action.type) {
      case 'CHANGE_FILTER':
        const filter = action.payload.filter;
        return filter;
      default:
        return state;
    }
  }

  const reducerTodos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TASK':
        return [...state, action.payload];
      case 'DELETE_TASK':
        const id = action.payload.id;
        return state.filter(item => {
          return item.id !== id;
        })
      default:
        return state;
    }
  }

  const rootReducer = combineReducers({
    todos: reducerTodos,
    filter: reducerFilter
  });

  const AddTask = (payload) => {
    return {
      type: 'ADD_TASK',
      payload
    }
  }

  const deleteTask = (payload) => {
    return {
      type: 'DELETE_TASK',
      payload
    }
  }

  const changeFilter = (payload) => {
    return {
      type: 'CHANGE_FILTER',
      payload
    }
  }

  function initApp() {
    store = createStore(
      rootReducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
    const $form = document.getElementById('form');
    $form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData($form);
      console.log(data.get('text'));
      const action = AddTask({
        id: 12,
        text: data.get('text'),
        completed: false
      });
      store.dispatch(action);
      const $input = document.getElementById('new-todo');
      $input.value = "";
    });
    store.subscribe(handleChange);
    render();

    const actionDelete = deleteTask({
      id: 1
    });
    const actionFilter = changeFilter({
      filter: 'ACTIVE'
    });
    setTimeout(() => {
      store.dispatch(actionDelete);
    }, 3000);
    setTimeout(() => {
      store.dispatch(actionFilter);
    }, 4000);
    setTimeout(() => {
      store.dispatch(changeFilter({
        filter: 'COMPLETED'
      }));
    }, 10000); 
    setTimeout(() => {
      const action = AddTask({
        id: 12,
        text: 'tarea abc',
        completed: true
      });
      store.dispatch(action);
    }, 8000);    
  }

  function handleChange() {
    render();
  }

  function render() {
    const state = store.getState();
    console.log(state);
    let todos = state.todos;
    const filter =  state.filter;
    console.log(filter);
    if (filter === 'ACTIVE') {
      todos = todos.filter(todo => !todo.completed);
    }
    if (filter === 'COMPLETED') {
      todos = todos.filter(todo => todo.completed);
    }
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