// TODO: Task CRUD logic, cookie count state
import { useState, useEffect } from 'react';
import { loadTasks, saveTasks } from './storage';
import { sounds } from './sound';

export function useTasks(triggerCelebration, settings) {

  const { enableBlyaaat, enableGetOut, soundVolume, enableDeleteEmoji } = settings;
  const [tasks, setTasks]   = useState(() => loadTasks());
  const [newTitle, setNewTitle] = useState('');
  useEffect(() => { saveTasks(tasks); }, [tasks]);

  // Add a new task
  function addTask() {
    const title = newTitle.trim();
    if (!title) return;
    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), title, isDone: false },
    ]);
    setNewTitle('');
  }

  // Toggle completion
  function toggleTask(id) {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextDone = !t.isDone;
        if (nextDone) triggerCelebration();
        return { ...t, isDone: nextDone };
      }
      return t;
    }));
  }

  // Delete a task
  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));

    const soundOptions = [];
    if (enableBlyaaat) soundOptions.push('blyaaat');
    if (enableGetOut)  soundOptions.push('getout');

    if (soundOptions.length > 0) {
      const snd = soundOptions[Math.floor(Math.random() * soundOptions.length)];
      sounds[snd].volume(soundVolume);
      sounds[snd].play();
    }

    if (enableDeleteEmoji) {
      triggerCelebration('emoji');
    }
  }
  
  return { tasks, newTitle, setNewTitle, addTask, toggleTask, deleteTask };

}
