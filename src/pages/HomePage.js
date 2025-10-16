import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import './HomePage.css'; // This line should be present

const HomePage = () => {
  const { user } = useAuth();
  const { tasks, loading, addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    const success = await addTask(title, description);
    
    if (success) {
      setTitle('');
      setDescription('');
      setError('');
    } else {
      setError('Failed to add task. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="home-page">
      <h1>Welcome, {user?.email}</h1>
      
      <div className="task-form-container">
        <h2>Add New Task</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description (optional)"
            />
          </div>
          <button type="submit" className="btn">Add Task</button>
        </form>
      </div>
      
      <TaskList tasks={tasks} />
    </div>
  );
};

export default HomePage;