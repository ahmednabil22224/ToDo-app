import { lineTask } from "./lineTask.js";
import { getStorage, saveInStorage } from "./storageData.js";
import { overlayBox1, showToast } from "./components/overLay.js";
import { getProgressBar } from "./components/footer.js";
// import { renderFooterCounts, renderEmptyListTasks } from "./app.js";

function tasksList() {
  const tasks = getStorage();

  const tasksContainer = document.createElement("div");
  tasksContainer.className = `tasks-container`;

  tasksContainer.innerHTML = `
            ${tasks
              .map((task) => lineTask(task))
              .reverse()
              .join("")}
        
            <div class='empty-list'  style= "display: ${
              tasks.length ? "none" : "block"
            }">
                <i class="fa-solid fa-clipboard-list"></i>
                <h2>The List Is Empty</h2>
                <small>Add a new task to get started!</small>
            </div>
        `;
  return tasksContainer;
}

//---------------------Add Task-----------------------------
function handleAddTask() {
  const allTasks = getStorage();

  const title = document
    .querySelector(".add-task")
    ?.value?.split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    .trim();

  if (!title) return;

  const id = allTasks.length ? allTasks[allTasks.length - 1].id + 1 : 1;

  const newTask = {
    id,
    title,
    date: new Date().toLocaleString(),
    isDone: false,
    important: false,
  };

  document
    .querySelector(".tasks-container")
    .insertAdjacentHTML("afterbegin", lineTask(newTask));

  const searchedInput = document.querySelector(".search").value.trim();
  if (
    searchedInput &&
    !title.includes(searchedInput[0].toUpperCase() + searchedInput.slice(1))
  ) {
    document.getElementById(id).closest(".task").style.display = "none";
  }

  renderEmptyListTasks();

  allTasks.push(newTask);

  saveInStorage(allTasks);
  getProgressBar();
  showToast(`Task ${title} added successfully ✅`, "success");

  document.querySelector(".add-task").value = "";
  document.querySelector(".add-task").focus();
}

//------------------Update Task----------------------------
function handleUpdateTask(id) {
  const allTasks = getStorage();
  const updatedTask = allTasks.find((task) => task.id === Number(id));

  // get DOM element
  document
    .getElementById("root")
    .appendChild(overlayBox1(updatedTask.title, "update"));

  // another way by getting html as a string
  //  document.getElementById('root').insertAdjacentHTML("beforeend", overlayBox(updatedItem.title, "update"));

  const confirm = document.querySelectorAll(".over-lay-message div button");

  document.querySelector(".update-title").focus();
  confirm.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      let updatedTitle = document
        .querySelector(".update-title")
        .value.split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ")
        .trim();

      if (
        e.target.classList.contains("yes") &&
        updatedTask.title !== updatedTitle &&
        updatedTitle
      ) {
        for (let index in allTasks) {
          if (allTasks[index].id === Number(id)) {
            allTasks[index] = {
              ...updatedTask,
              title: updatedTitle,
              date: new Date().toLocaleString(),
            };
          }
        }
        // another way with map
        // allTasks = allTasks.map(ele => {
        //     return (ele.id === Number(id)) ? {...ele, title: updatedTitle, date: new Date().toLocaleString() } : ele;
        // });

        const targetTask = document.getElementById(id).closest(".task");
        targetTask.querySelector("h2").textContent = document
          .querySelector(".update-title")
          .value.split(" ")
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ")
          .trim();
        targetTask.querySelector("p").textContent = new Date().toLocaleString();

        saveInStorage(allTasks);
        showToast(
          `Task ${updatedTask.title} updated to ${updatedTitle} successfully ✏️!`,
          "warning"
        );
      }
      document
        .getElementById("root")
        .removeChild(document.querySelector(".over-lay-box"));
    });
  });
}

//------------------Delete Task----------------------------
function handleDeleteTask(id) {
  const allTasks = getStorage();
  const removedTask = allTasks.find((task) => task.id === Number(id));

  // get DOM element
  document
    .getElementById("root")
    .appendChild(overlayBox1(removedTask.title, "delete"));

  // another way by getting html as a string
  // document.getElementById('root').insertAdjacentHTML("beforeend", overlayBox(removedItem.title, "delete"));

  const confirm = document.querySelectorAll(".over-lay-message div button");

  confirm.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      if (e.target.classList.contains("yes")) {
        for (let index in allTasks) {
          if (allTasks[index].id === Number(id)) {
            allTasks.splice(index, 1);
          }
        }
        // another way with filter
        // allTasks= allTasks.filter((ele) => ele.id != Number(id))

        document.getElementById(id).closest(".task").remove();

        renderEmptyListTasks();

        renderFooterCounts();
        saveInStorage(allTasks);
        getProgressBar();
        showToast(`Task ${removedTask.title} deleted successfully ❌`, "error");
      }
      document
        .getElementById("root")
        .removeChild(document.querySelector(".over-lay-box"));
    });
  });
}

//-----------------Complete Task--------------------------
function handleCompleteTask(id) {
  const allTasks = getStorage();
  const completededTask = allTasks.find((task) => task.id === Number(id));
  const allCompletededTasks = allTasks.map((task) => {
    return task.id === Number(id)
      ? { ...task, isDone: !task.isDone, date: new Date().toLocaleString() }
      : task;
  });

  const targetTask = document.getElementById(id).closest(".task");
  targetTask.querySelector("p").textContent = new Date().toLocaleString();
  if (
    document
      .querySelector(".not-completed-tasks")
      .classList.contains("choosed-bttn") ||
    document
      .querySelector(".completed-tasks")
      .classList.contains("choosed-bttn")
  ) {
    targetTask.style.display = "none";
  }
  let button = targetTask.querySelector(".complete-bttn");
  button.firstElementChild.classList.toggle("fa-check");
  button.firstElementChild.classList.toggle("fa-xmark");
  button.closest(".task").classList.toggle("done-task");
  button.classList.toggle("complete");

  renderEmptyListTasks();

  saveInStorage(allCompletededTasks);
  getProgressBar();
  completededTask.isDone
    ? showToast(
        `Task ${completededTask.title} not completed successfully ❌`,
        "error"
      )
    : showToast(
        `Task ${completededTask.title} completed successfully ✔️`,
        "success"
      );
}

//------------------Important Task------------------------
function handleImportantTask(id) {
  const allTasks = getStorage();
  const importantTask = allTasks.find((task) => task.id === Number(id));
  const allImportantTasks = allTasks.map((task) => {
    return task.id === Number(id)
      ? {
          ...task,
          important: !task.important,
          date: new Date().toLocaleString(),
        }
      : task;
  });

  const targetTask = document.getElementById(id).closest(".task");
  targetTask.querySelector(".important-bttn").classList.toggle("important");
  targetTask.querySelector("p").textContent = new Date().toLocaleString();
  if (
    document
      .querySelector(".important-tasks")
      .classList.contains("choosed-bttn")
  ) {
    targetTask.style.display = "none";
  }

  renderEmptyListTasks();

  saveInStorage(allImportantTasks);
  importantTask.important
    ? showToast(
        `Task ${importantTask.title} become not important successfully ❌`,
        "error"
      )
    : showToast(
        `Task ${importantTask.title} become important successfully 🔥`,
        "warning"
      );
}

//   -----------------Render Tasks Container If Dont't Contain Tasks------------------
function renderEmptyListTasks() {
  const tasksElements = document.querySelectorAll(".task");
  if (!tasksElements.length) {
    document.querySelector(".empty-list").style.display = "block";
    document.querySelector(".empty-list h2").textContent = "The List Is Empty";
  } else if (
    tasksElements.length &&
    [...tasksElements].every(
      (task) => getComputedStyle(task).display === "none"
    )
  ) {
    document.querySelector(".empty-list").style.display = "block";
    document.querySelector(".empty-list h2").textContent =
      "The Item Is Not Found";
  } else {
    document.querySelector(".empty-list").style.display = "none";
  }
}

export {
  tasksList,
  handleAddTask,
  handleUpdateTask,
  handleDeleteTask,
  handleCompleteTask,
  handleImportantTask,
  renderEmptyListTasks,
};
