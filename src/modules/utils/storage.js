// src/utils/storage.js
export function loadTasks() {
    try {
      const json = localStorage.getItem("tasks");
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  }
  
  export function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  