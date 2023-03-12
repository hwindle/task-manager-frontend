import './App.css';
import Landing from './pages/Landing';
import TasksRouter from './router/TasksRouter';
// auth0
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <main>
      {isAuthenticated && <TasksRouter />}
      {!isAuthenticated && <Landing />}
    </main>
  );
}

export default App;
