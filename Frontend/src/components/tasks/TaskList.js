// src/components/tasks/TaskList.js
import React, { useState, useEffect } from 'react';
import { getAllTasks, deleteTask } from '../../services/tasks';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const taskData = await getAllTasks();
      setTasks(taskData);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setAddTaskModalOpen(false);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button 
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() => setAddTaskModalOpen(true)}
        >
          Add New Task
        </button>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      
      {isLoading ? (
        <div className="text-center py-8">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No tasks found. Create your first task!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Todo column */}
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-medium mb-4">To Do</h2>
            <div className="space-y-4">
              {todoTasks.map(task => (
                <TaskItem 
                  key={task._id} 
                  task={task} 
                  onDelete={handleDeleteTask}
                  onUpdate={handleUpdateTask}
                />
              ))}
              {todoTasks.length === 0 && (
                <div className="text-center py-4 text-gray-500">No tasks to do</div>
              )}
            </div>
          </div>

          {/* In Progress column */}
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-medium mb-4">In Progress</h2>
            <div className="space-y-4">
              {inProgressTasks.map(task => (
                <TaskItem 
                  key={task._id} 
                  task={task} 
                  onDelete={handleDeleteTask}
                  onUpdate={handleUpdateTask}
                />
              ))}
              {inProgressTasks.length === 0 && (
                <div className="text-center py-4 text-gray-500">No tasks in progress</div>
              )}
            </div>
          </div>

          {/* Completed column */}
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-medium mb-4">Completed</h2>
            <div className="space-y-4">
              {completedTasks.map(task => (
                <TaskItem 
                  key={task._id} 
                  task={task} 
                  onDelete={handleDeleteTask}
                  onUpdate={handleUpdateTask}
                />
              ))}
              {completedTasks.length === 0 && (
                <div className="text-center py-4 text-gray-500">No completed tasks</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {addTaskModalOpen && (
        <AddTask 
          onClose={() => setAddTaskModalOpen(false)} 
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
};

export default TaskList;
