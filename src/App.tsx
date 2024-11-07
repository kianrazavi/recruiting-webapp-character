import { CharacterSheet } from './components/CharacterSheet';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - Kian Razavi</h1>
      </header>
      <section className="App-section">
        <CharacterSheet id="1" />
      </section>
    </div>
  );
}

export default App;
