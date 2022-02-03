import './App.css';
import { UserCreationForm } from './components/UserCreationForm/UserCreationForm.jsx'
import { Alert } from './components/Alert/Alert.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Robert Perillo's Fetch Submission</div>
      </header>
      <main>
        <UserCreationForm />
        <Alert />
      </main>
    </div>
  );
}

export default App;
