import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/todos', { title });
      setTodos([...todos, response.data]);
      setTitle(''); // Clear the input after adding
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error('Error adding todo:', error);
      }
    }
  };

  const updateTodo = async (id) => {
    if (!editingTitle.trim()) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { title: editingTitle });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditId(null); // Clear edit mode
      setEditingTitle(''); // Clear editing title after update
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error('Error updating todo:', error);
      }
    }
  };

  const deleteTodo = async (id) => {
    if (editId === id) {
      setErrorMessage('Cannot delete a task while it is being edited.');
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    if (!todo) return;
  
    try {
      const response = await axios.patch(`http://localhost:5000/api/todos/${id}`, {
        completed: !todo.completed, // Toggle the completed status
      });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.error('Error toggling completion status:', error);
    }
  };
  

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setEditingTitle(todo.title);
  };

  const handleEditChange = (e) => {
    setEditingTitle(e.target.value);
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      updateTodo(id);
    }
  };

  const closeErrorModal = () => setErrorMessage('');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-indigo-600 flex items-center justify-center mb-4">
          To-Do List <span className="ml-2">📋</span>
        </h1>
        
        <form onSubmit={addTodo} className="flex mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            type="submit"
            className="bg-orange-500 text-white px-4 rounded-r-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 transition-all duration-300"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500">No Task for Today</p>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo._id}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo._id)}
                      className="form-checkbox h-5 w-5 text-orange-500"
                    />
                    {editId === todo._id ? (
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={handleEditChange}
                        onKeyPress={(e) => handleKeyPress(e, todo._id)}
                        className="flex-1 p-1 border-b border-gray-400 focus:outline-none focus:border-indigo-500"
                      />
                    ) : (
                      <div>
                        <span className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                          {todo.title}
                        </span>
                        {/* Display the created date and time */}
                        <div>
                          <span className="text-gray-500 text-sm">
                            Created: {new Date(todo.createdAt).toLocaleString("en-US", { timeZone: "Asia/Manila" })}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {editId === todo._id ? (
                      <button onClick={() => updateTodo(todo._id)} className="text-blue-500 hover:text-blue-700 mr-2">
                        Save
                      </button>
                    ) : (
                      <button onClick={() => handleEdit(todo)} className="text-blue-500 hover:text-blue-700 mr-2">
                        Edit
                      </button>
                    )}
                    <button onClick={() => deleteTodo(todo._id)} className="text-red-500 hover:text-red-700">
                      ✕
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>


        {/* Error Modal */}
        {errorMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
              <h2 className="text-lg font-semibold mb-4 text-red-600">Error</h2>
              <p>{errorMessage}</p>
              <button
                onClick={closeErrorModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoApp;
