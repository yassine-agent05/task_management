import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleToggleComplete = async () => {
    await updateTask(task._id, { completed: !task.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleSaveEdit = async () => {
    if (editTitle.trim()) {
      await updateTask(task._id, {
        title: editTitle,
        description: editDescription
      });
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    
      await deleteTask(task._id);
    
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="form-group">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
          />
        </div>
        <div className="form-group">
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Task description (optional)"
          />
        </div>
        <div className="task-actions">
          <button onClick={handleSaveEdit} className="btn save">Save</button>
          <button onClick={handleCancelEdit} className="btn cancel">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <div className="task-meta">
          <span className="task-date">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="task-actions">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="task-checkbox"
        />
        <button onClick={handleEdit} className="btn edit">Edit</button>
        <button onClick={handleDelete} className="btn delete">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;