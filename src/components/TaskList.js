import React, { useState } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks }) => {
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest', 'oldest', 'completed', 'incomplete'

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOrder === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortOrder === 'completed') {
      return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
    } else if (sortOrder === 'incomplete') {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    }
    return 0;
  });

  if (tasks.length === 0) {
    return <div className="no-tasks">No tasks yet. Add a task to get started!</div>;
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <div className="sort-controls">
          <label htmlFor="sort-by">Sort by:</label>
          <select id="sort-by" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      <div className="task-list">
        {sortedTasks.map(task => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;