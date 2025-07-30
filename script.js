const API_URL = "https://mockapi.io/tasks";
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("error");

// Modal elements
const editModal = document.getElementById("editModal");
const editTitle = document.getElementById("editTitle");
const editStatus = document.getElementById("editStatus");
const saveEdit = document.getElementById("saveEdit");
const closeModal = document.getElementById("closeModal");

let currentTaskId = null;

// Fetch all tasks
async function fetchTasks() {
  taskList.innerHTML = "";
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task.title} - <strong>${task.status}</strong></span>
        <div>
          <button class="edit-btn" onclick="openEditModal('${task.id}', '${task.title}', '${task.status}')">Edit</button>
          <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  } catch (error) {
    errorMsg.textContent = "Error loading tasks!";
    console.error(error);
  }
}

// Open modal for editing
window.openEditModal = (id, title, status) => {
  currentTaskId = id;
  editTitle.value = title;
  editStatus.value = status;
  editModal.style.display = "block";
};

// Close modal
closeModal.addEventListener("click", () => {
  editModal.style.display = "none";
});

// Save changes (PATCH)
saveEdit.addEventListener("click", async () => {
  try {
    await fetch(${API_URL}/${currentTaskId}, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle.value, status: editStatus.value })
    });
    editModal.style.display = "none";
    fetchTasks(); // Refresh list
  } catch (error) {
    errorMsg.textContent = "Error updating task!";
    console.error(error);
  }
});

// Delete task
window.deleteTask = async (id) => {
  if (confirm("Are you sure you want to delete this task?")) {
    try {
      await fetch(${API_URL}/${id}, { method: "DELETE" });
      fetchTasks(); // Refresh list
    } catch (error) {
      errorMsg.textContent = "Error deleting task!";
      console.error(error);
    }
  }
};

// Load tasks on start
fetchTasks();