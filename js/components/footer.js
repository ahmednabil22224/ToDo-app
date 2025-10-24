import {
  getStorage,
  saveInStorage,
  getCompletedTasks,
  getNotCompletedTasks,
  getImportantTasks,
} from "../storageData.js";
import { overlayBox1, showToast } from "./overLay.js";

const footer = () => {
  return `  
                <div class="footer"  data-attr="50%">
                    <div class='progress'>
                        <div class='text-bar'>✅ ${
                          getCompletedTasks().length
                        } From ${getStorage().length} Tasks Completed</div>
                        <div class='bar'></div>
                    </div>
                    <div class='content'>
                        <div>
                            <p class="all-tasks-count">All Tasks: <span>${
                              getStorage().length
                            }</span></p>
                            <p class="important-tasks-count">Important: <span>${
                              getImportantTasks().length
                            }</span></p>
                            <p class="complete-tasks-count">Completed: <span>${
                              getCompletedTasks().length
                            }</span></p>
                            <p class="notcomplete-tasks-count">Not Completed: <span>${
                              getNotCompletedTasks().length
                            }</span></p>
                        </div>
                        <button class="delete-complete" title='Clear Completed Tasks' aria-label="Clear Completed Tasks">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    <div id="toast" class="toast"></div>
                </div>
            `;
};
// ---------------------Clear Completed Tasks-----------------------
const clearCompletedTasks = () => {
  document
    .getElementById("root")
    .appendChild(overlayBox1("All Completed Tasks", "delete"));
  let confirm = document.querySelectorAll(".over-lay-message div button");

  confirm.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      if (e.target.classList.contains("yes")) {
        const filteredTasks = getStorage().filter(
          (task) => task.isDone === false
        );

        document
          .querySelectorAll(".done-task")
          .forEach((task) => task.remove());

        saveInStorage(filteredTasks);
        getProgressBar();
        showToast(`Completed Tasks deleted successfully ❌`, "error");
      }
      document
        .getElementById("root")
        .removeChild(document.querySelector(".over-lay-box"));
    });
  });
};
// ------------------------Get Progress Bar-------------------------------
const getProgressBar = () => {
  const completedTasksCount = getStorage().filter((task) => task.isDone).length;
  const progressBarWidth = completedTasksCount / getStorage().length || 0;

  const progressBar = document.querySelector(".progress .bar");
  progressBar.style.setProperty("width", `${progressBarWidth * 100}%`);
};

// -----------------Render Footer Tasks Count-------------------
const renderFooterCounts = () => {
  const allTasksCount = document.querySelectorAll(".task").length;
  const completedTasksCount = document.querySelectorAll(".complete").length;
  document.querySelector(".all-tasks-count span").textContent = allTasksCount;
  document.querySelector(".important-tasks-count span").textContent =
    document.querySelectorAll(".important").length;
  document.querySelector(".complete-tasks-count span").textContent =
    completedTasksCount;
  document.querySelector(".notcomplete-tasks-count span").textContent =
    allTasksCount - completedTasksCount;

  document.querySelector(
    ".text-bar"
  ).textContent = `✅ ${completedTasksCount} From ${allTasksCount} Tasks Completed`;
};

export { footer, clearCompletedTasks, getProgressBar, renderFooterCounts };
