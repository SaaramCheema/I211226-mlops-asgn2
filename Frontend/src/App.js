import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TaskList from './components/tasks/TaskList';
import Header from './components/Layout/Header';
import PrivateRoute from './components/PrivateRoute';
// Add error boundary for debugging
function ErrorBoundary({ children }) {
  const [hasError, setHasError] = React.useState(false);
  
  React.useEffect(() => {
    const errorHandler = (error) => {
      console.error('Caught an error:', error);
      setHasError(true);
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return <div className="p-4 text-red-500">Error occurred. Check console.</div>;
  }

  return children;
}

function App() {
  console.log("App component rendering"); // Debug log
  
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto py-6 px-4">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <TaskList />
                    </PrivateRoute>
                  } 
                />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </main>
          </div>  
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;