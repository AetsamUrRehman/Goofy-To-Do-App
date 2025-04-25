import React from "react";

export default function TaskList({
    tasks,
    toggleTask,
    deleteTask
}) {
    // Handle checkbox toggle animation
    function handleToggle(id, e) {
        const inputEl = e.currentTarget;
        inputEl.style.transition = 'transform 0.3s ease-in-out';
        inputEl.style.transform  = 'scale(1.3)';
        setTimeout(() => {
            inputEl.style.transform = 'scale(1)';
        }, 300);
        toggleTask(id);
    }

    return (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={e => handleToggle(task.id, e)}
              />
              <span style={{
                flex: 1,
                marginLeft: '0.5rem',
                textDecoration: task.isDone ? 'line-through' : 'none',
                textDecorationThickness: task.isDone ? '3px' : 'initial',
                textDecorationColor: task.isDone ? '#ff77aa' : 'initial',
                color: task.isDone ? '#999' : 'inherit',
              }}>
                {task.title}
              </span>
              <button onClick={() => deleteTask(task.id)}>🗑️</button>
            </li>
          ))}
        </ul>
    );
}