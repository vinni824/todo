const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

const getTodos = () => {
  fetch(apiUrl + '?_limit=20')
    .then(res => res.json())
    .then(data => data.forEach(todo => addTodoToDOM(todo)));
};

const addTodoToDOM = todo => {
  const div = document.createElement('div');
  div.className = 'todo' + (todo.completed ? ' done' : '');
  div.textContent = todo.title;
  div.dataset.id = todo.id;
  document.getElementById('todo-list').appendChild(div);
};

const createTodo = e => {
  e.preventDefault();
  const newTodo = { title: e.target.firstElementChild.value, completed: false };
  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(todo => addTodoToDOM(todo));
};

const toggleCompleted = e => {
  if (e.target.classList.contains('todo')) {
    const isCompleted = e.target.classList.toggle('done');
    updateTodo(e.target.dataset.id, isCompleted);
  }
};

const updateTodo = (id, completed) => {
  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
    headers: { 'Content-Type': 'application/json' }
  });
};

const deleteTodo = e => {
  if (e.target.classList.contains('todo')) {
    fetch(`${apiUrl}/${e.target.dataset.id}`, { method: 'DELETE' })
      .then(() => e.target.remove());
  }
};

const init = () => {
  document.addEventListener('DOMContentLoaded', getTodos);
  document.querySelector('#todo-form').addEventListener('submit', createTodo);
  document.querySelector('#todo-list').addEventListener('click', toggleCompleted);
  document.querySelector('#todo-list').addEventListener('dblclick', deleteTodo);
};

init();
