import React, { useState } from 'react';
import { Trash2, Plus, Calendar, Tag, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  // Get current date in readable format
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(new Date());

  const handleAddTodo = () => {
    if (!newTodo.trim()) {
      setError('Please enter a task description');
      return;
    }
    
    const todo = {
      id: Date.now(),
      text: newTodo.trim(),
      timestamp: new Date(),
      completed: false,
      priority: 'medium'
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
    setError('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gradient-to-b from-rose-100 to-rose-200 min-h-screen">
      <Card className="bg-white/90 backdrop-blur">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-gray-800">Todo App</CardTitle>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <Calendar size={14} />
            {today}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Input Section */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add your todo"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              />
              <button
                onClick={handleAddTodo}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                Add
              </button>
            </div>
            
            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription className="text-sm flex items-center gap-2">
                  <AlertCircle size={14} />
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Todo List */}
          <div className="space-y-2">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:shadow-md transition-shadow ${
                  todo.completed ? 'bg-gray-50' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                
                <div className="flex-1">
                  <p className={`text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.text}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={12} />
                      {new Intl.DateTimeFormat('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(todo.timestamp)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Tag size={12} />
                      {todo.priority}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Delete todo"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            
            {todos.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No todos yet. Add one to get started!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoApp;