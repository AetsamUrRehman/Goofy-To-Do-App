import React from 'react';

export default function TaskForm({ newTitle, setNewTitle, addTask }) {
  // on “Enter” or button click, call addTask
  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask();
  }

  return (
    <div className="add-form">
      <input
        type="text"
        placeholder="What’s next?"
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTask}>Add It!</button>
    </div>
  );
}
