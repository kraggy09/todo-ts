import "./style.css";

interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

// Load todos from local storage when the page loads
const todosJSON: string | null = localStorage.getItem("todos");
const todos: Todo[] = todosJSON ? JSON.parse(todosJSON) : [];

const myForm = document.getElementById("myForm") as HTMLFormElement;

const todoContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const todoInput = document.getElementById("inp") as HTMLInputElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    id: generateUniqueId(), // Use a function to generate a unique id
    title: todoInput.value,
    isCompleted: false,
  };

  todos.push(todo);
  saveTodosToLocalStorage(); // Save todos to local storage
  console.log(todos);

  todoInput.value = "";
  renderTodo();
};

function generateUniqueId(): string {
  return Date.now().toString(); // Using timestamp as a simple unique id
}

function renderTodo() {
  todoContainer.innerText = "";
  todos.forEach((item) => {
    generateTodoItem(item);
  });
}

function generateTodoItem(item: Todo) {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "todo";

  const check: HTMLInputElement = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.classList.add("isCompleted");
  check.checked = item.isCompleted;

  const para: HTMLParagraphElement = document.createElement("p");
  para.innerText = item.title;

  // Handle the checkbox change event
  check.onchange = () => {
    item.isCompleted = check.checked;
    updateTextCutClass(para, item.isCompleted);
    saveTodosToLocalStorage(); // Update and save todos to local storage
  };

  // Apply the initial textCut class
  updateTextCutClass(para, item.isCompleted);

  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  div.append(check, para, btn);
  todoContainer.appendChild(div);
  btn.onclick = () => {
    deleteTodo(item.id);
  };
}

function updateTextCutClass(element: HTMLElement, isCompleted: boolean) {
  if (isCompleted) {
    element.classList.add("textCut");
  } else {
    element.classList.remove("textCut");
  }
}

function deleteTodo(id: string) {
  const idx = todos.findIndex((item) => item.id === id);
  if (idx !== -1) {
    todos.splice(idx, 1);
    saveTodosToLocalStorage(); // Remove and save todos to local storage
    renderTodo();
  }
}

function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Initial rendering when the page loads
renderTodo();
