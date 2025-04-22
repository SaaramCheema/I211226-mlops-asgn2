import React, { useState } from 'react';
import EditTask from './EditTask';

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Get appropriate color for status badge
  const getStatusColor = (status) => {
    switch(status) {
      case 'todo':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format status for display
  const formatStatus = (status) => {
    switch(status) {
      case 'todo':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <>
      {isEditing ? (
        <EditTask 
          task={task} 
          onClose={() => setIsEditing(false)} 
          onUpdate={(updatedTask) => {
            onUpdate(updatedTask);
            setIsEditing(false);
          }} 
        />
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">{task.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
              {formatStatus(task.status)}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-4">{task.description}</p>
          <div className="flex justify-between">
            <div className="text-xs text-gray-500">
              {new Date(task.createdAt).toLocaleDateString()}
            </div>
            <div className="space-x-2">
              <button 
                className="text-sm text-indigo-600 hover:text-indigo-900"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button 
                className="text-sm text-red-600 hover:text-red-900"
                onClick={() => onDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;