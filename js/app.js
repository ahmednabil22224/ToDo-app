import { header } from "./components/header.js";
import { tasksList, renderEmptyListTasks } from "./tasksList.js";
import {
  footer,
  clearCompletedTasks,
  getProgressBar,
  renderFooterCounts,
} from "./components/footer.js";
import {
  handleAddTask,
  handleDeleteTask,
  handleCompleteTask,
  handleUpdateTask,
  handleImportantTask,
} from "./tasksList.js";

const init = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (!localStorage.getItem("mode")) {
    localStorage.setItem("mode", prefersDark ? "dark" : "light");
  }
  document.body.classList.add(localStorage.getItem("mode"));
  //-----------------Render Components In User Interface-------------------
  document.getElementById("root").innerHTML = `
    ${header()}

    ${tasksList().outerHTML}
    
    ${footer()}
`;

  //-----------------Render Searched Tasks-------------------
  document.addEventListener("input", (e) => {
    if (e.target.classList.contains("search")) {
      let searchedTitle = e.target.value;

      if (
        document
          .querySelector(".completed-tasks")
          .classList.contains("choosed-bttn")
      ) {
        document.querySelectorAll(".task").forEach((task) => {
          if (
            task
              .querySelector("h2")
              .textContent.toUpperCase()
              .includes(searchedTitle.toUpperCase().trim()) &&
            task.classList.contains("done-task")
          ) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
        });
      } else if (
        document
          .querySelector(".not-completed-tasks")
          .classList.contains("choosed-bttn")
      ) {
        document.querySelectorAll(".task").forEach((task) => {
          if (
            task
              .querySelector("h2")
              .textContent.toUpperCase()
              .includes(searchedTitle.toUpperCase().trim()) &&
            !task.classList.contains("done-task")
          ) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
        });
      } else if (
        document
          .querySelector(".important-tasks")
          .classList.contains("choosed-bttn")
      ) {
        document.querySelectorAll(".task").forEach((task) => {
          if (
            task
              .querySelector("h2")
              .textContent.toUpperCase()
              .includes(searchedTitle.toUpperCase().trim()) &&
            task
              .querySelector(".important-bttn")
              .classList.contains("important")
          ) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
        });
      } else {
        document.querySelectorAll(".task").forEach((task) => {
          if (
            task
              .querySelector("h2")
              .textContent.toUpperCase()
              .includes(searchedTitle.toUpperCase().trim())
          ) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
        });
      }
    }

    renderEmptyListTasks();
  });

  // ----------------------Render All Tasks---------------------------
  document.querySelector(".all-tasks").addEventListener("click", (e) => {
    document.querySelector(".search").value = "";
    document.querySelectorAll(".task").forEach((task) => {
      task.style.display = "flex";
    });
    choosedBttn(e);

    renderEmptyListTasks();
  });

  // --------------------Render Completed Tasks Listener-----------------------
  document.querySelector(".completed-tasks").addEventListener("click", (e) => {
    document.querySelector(".search").value = "";
    document.querySelectorAll(".task").forEach((task) => {
      if (task.classList.contains("done-task")) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
    choosedBttn(e);

    renderEmptyListTasks();
  });

  // --------------------Render Notcompleted Tasks Listener-----------------------
  document
    .querySelector(".not-completed-tasks")
    .addEventListener("click", (e) => {
      document.querySelector(".search").value = "";
      document.querySelectorAll(".task").forEach((task) => {
        if (!task.classList.contains("done-task")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
      });
      choosedBttn(e);

      renderEmptyListTasks();
    });

  // --------------------Render Important Tasks Listener-----------------------
  document.querySelector(".important-tasks").addEventListener("click", (e) => {
    document.querySelector(".search").value = "";
    document.querySelectorAll(".task").forEach((task) => {
      if (
        task.querySelector(".important-bttn").classList.contains("important")
      ) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
    choosedBttn(e);

    renderEmptyListTasks();
  });

  //---------------------Add Task Listener Listener----------------
  document.getElementById("add").addEventListener("click", (e) => {
    if (document.querySelector(".add-task").value.trim() === "") return;
    handleAddTask(e);
    renderFooterCounts();
  });

  // ------------------Update & Delete & Complete & Important Task Listener---------------------------
  document.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;
    //---------------------Update Task Listener-------------------
    if (button.classList.contains("update-task")) {
      handleUpdateTask(button.id);
    }

    //--------------------Delete Task Listener------------------------
    if (button.classList.contains("delete-task")) {
      handleDeleteTask(button.id);
    }

    //----------------------Complete Task Listener---------------------
    if (button.classList.contains("complete-bttn")) {
      handleCompleteTask(button.id);
      renderFooterCounts();
    }

    //----------------------Important Task Listener---------------------
    if (button.classList.contains("important-bttn")) {
      handleImportantTask(button.id);
      renderFooterCounts();
    }
  });

  //----------------------Clear All Completed Tasks Listener---------------------
  document.querySelector(".delete-complete").addEventListener("click", (e) => {
    clearCompletedTasks();
  });

  //----------------------Convert Light Mode Listener---------------------
  document.querySelector(".mode").addEventListener("click", (e) => {
    document.body.classList.toggle("dark");

    if (localStorage.getItem("mode") === "light") {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
  });

  // ---------------------------Choosed Button------------------------------
  function choosedBttn(event) {
    document.querySelectorAll("nav button").forEach((bttn) => {
      if (bttn.classList.contains("choosed-bttn"))
        bttn.classList.remove("choosed-bttn");
    });
    event.target.classList.add("choosed-bttn");
  }

  // ---------------------------Progress Bar------------------------------
  getProgressBar();
};

window.addEventListener("DOMContentLoaded", init);
