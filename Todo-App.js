const form = document.querySelector("#new-task-form");
const eventInput = document.querySelector("#event-input");
const dateInput = document.querySelector("#date-time-input");
const colorInput = document.querySelector("#color-input");
const plusButton = document.querySelector("#buttonPlus");
const exitButton = document.querySelector(".exit");
const tasks = document.querySelector("#tasks");
const image = document.querySelector("#image");
$(exitButton).hide();
let todoList = JSON.parse(localStorage.getItem("todo-list"));
let editId;
let isEditMode = false;
showTodoList();


plusButton.addEventListener("click", function() {
    $(".exit").fadeIn();
    $(".pop-task").fadeIn();
});

exitButton.addEventListener("click", function() {
    $(".exit").fadeOut();
    $(".pop-task").fadeOut();
});

function showTodoList() {
    let task = "";
    if(todoList) {
        image.classList.add("image-hide");
        plusButton.classList.add("button-add-task-notempty");
        tasks.classList.remove("image-hide");
        todoList.forEach((todo, id) => {
            task += `<div class="task">
                        <div class="point-color">
                            <i class="fa-solid fa-droplet" style="color:` + todo.color + `"></i>
                        </div>
                        <div class="content">
                        <textarea class="input-task input-size-event" cols="20" rows="1" readonly>` + todo.event +`</textarea>

                        </div>
                        <div class="actions">
                            <button onclick="editEvent(` + id + `)" class="input-task"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button onclick="deleteEvent(` + id + `)" class="input-task"><i class="fa-solid fa-eraser"></i></button>
                        </div>
                        <div class="date">
                            <input class="input-task date-input" type="text" value="` + todo.date + `" size="20" readonly>
                        </div>
                    </div>`
        });
        tasks.innerHTML = task;
        
        if(todoList.length == 0) {
            image.classList.remove("image-hide");
            plusButton.classList.remove("button-add-task-notempty");
            tasks.classList.add("image-hide");
        }
    } 
}

function editEvent(idEventEdit) {
    $(".exit").fadeIn();
    $(".pop-task").fadeIn();
    document.querySelector(".task-title").textContent = "Edit Task";
    document.querySelector("#new-task-submit").value = "Update";
    eventInput.value = todoList[idEventEdit].event;
    dateInput.value = todoList[idEventEdit].date;
    colorInput.value = todoList[idEventEdit].color;
    editId = idEventEdit;
    isEditMode = true;
}

function deleteEvent(idEventDelete) {
    todoList.splice(idEventDelete, 1);
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    showTodoList();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let taskEvent = eventInput.value.trim();
    let taskDate = dateInput.value;
    let taskColor = colorInput.value;

    if(!taskEvent || !taskDate) {
        alert("Please fill out the task.");
    }
    else {
        if(!isEditMode) {
            if(!todoList) {
                todoList = [];
            }
            let taskInfo = {event: taskEvent, date: taskDate, color:taskColor};
            todoList.push(taskInfo);
            localStorage.setItem("todo-list", JSON.stringify(todoList));
        }
        else {
                todoList[editId].event = eventInput.value;
                todoList[editId].date = dateInput.value;
                todoList[editId].color = colorInput.value;
                localStorage.setItem("todo-list", JSON.stringify(todoList));
        }
    }

    $(".exit").fadeOut();
    $(".pop-task").fadeOut();
    eventInput.value = "";
    dateInput.value = "";
    colorInput.value = "";
    if(isEditMode) {
        document.querySelector(".task-title").textContent = "Add New Task";
        document.querySelector("#new-task-submit").value = "Enter new event";
        isEditMode = false;
    }
    showTodoList();
});