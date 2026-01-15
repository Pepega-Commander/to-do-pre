let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const loaded = localStorage.getItem("todos")
	return loaded ? JSON.parse(loaded) : items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
	clone.remove();
	const currentTasks = getTasksFromDOM();
	saveTasks(currentTasks);
  });

  duplicateButton.addEventListener("click", () => {
	const text = textElement.textContent;
	const copiedText = createItem(text);
	listElement.prepend(copiedText);
	const currentTasks = getTasksFromDOM();
	saveTasks(currentTasks);
  });

  editButton.addEventListener("click", () => {
	textElement.setAttribute('contenteditable', 'true');
	textElement.focus();
  });

  textElement.addEventListener('blur', () => {
	textElement.setAttribute('contenteditable', 'false');
	const elements = getTasksFromDOM();
	saveTasks(elements);
  });

  return clone;
}

function getTasksFromDOM() {
	const textContent = document.querySelectorAll(".to-do__item-text");
	const tasksToExtract = [];
	textContent.forEach((element) => {
		tasksToExtract.push(element.textContent)
	});
	return tasksToExtract;
}

function saveTasks(tasks) {
	localStorage.setItem("todos", JSON.stringify(tasks));
}

formElement.addEventListener("submit", function(event) {
	event.preventDefault();
	const inputText = inputElement.value;
	if (inputText.trim() !== "") {
		const newElement = createItem(inputText);
        listElement.prepend(newElement);
        const itemsList = getTasksFromDOM();
        saveTasks(itemsList);
        inputElement.value = '';
	}
});

tasks = loadTasks();
tasks.forEach((task) => {
	const element = createItem(task);
	listElement.append(element);
});
