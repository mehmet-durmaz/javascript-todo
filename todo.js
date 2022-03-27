let addButton = document.querySelector(".button"); // ekleme butonumuzu seçtik
let input = document.querySelector("#input"); // input alanımızı seçtik
let ullenght = document.getElementsByTagName("li"); // bütün li elemanlarını seçtik
let ulList = document.getElementById("list");
let removeItemButton = document.getElementsByClassName("far"); // silme butonu oluşturduk ve seçtik

//yapildi islemi uyguladik
ulList.addEventListener("click", function (ev) {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");
  }
});

// tıklandığında fonksiyonu çalıştırır
addButton.addEventListener("click", addElement);

// bir ekleme fonksiyonu yazdık
function addElement() {
  let newTodo = input.value.trim();
  if (newTodo == "") {
    alert("boş girmeyin lütfen");
  } else {
    addElementToUI(newTodo);
    addElementToStorage(newTodo);
  }
}

//arayüze ekleyen fonksiyon
function addElementToUI(newTodo) {
  let listItem = document.createElement("li");
  listItem.innerHTML = newTodo;
  ulList.append(listItem);
  input.value = "";

  let deleteIcon = document.createElement("span");
  deleteIcon.className = "far fa-trash-alt";
  listItem.appendChild(deleteIcon);

  for (let i = 0; i <= ullenght.length; i++) {
    removeItemButton[i].onclick = deleteElement;
  }
}

//silme butonu olusturma
for (let i = 0; i < ullenght.length; i++) {
  let deleteIcon = document.createElement("span");
  deleteIcon.className = "far fa-trash-alt";
  ullenght[i].appendChild(deleteIcon);
}

//silme işlemi

for (let i = 0; i <= ullenght.length; i++) {
  removeItemButton[i].onclick = deleteElement;
}

// add storage
function startStorage() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addElementToStorage(newTodo) {
  let todos = startStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
//localStorage delete element
function deleteStorage(inputElement) {
  let todos = startStorage();

  todos.forEach(function (todo, index) {
    if (todo === inputElement) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

//delete
function deleteElement(e) {
  this.parentElement.remove();
  let inputElement = e.target.parentElement.textContent;
  deleteStorage(inputElement);
}

document.addEventListener("DOMContentLoaded", loadFromStorage)

function loadFromStorage() {
  let todos = startStorage();

  todos.forEach(function (todo) {
    addElementToUI(todo);
  })
}