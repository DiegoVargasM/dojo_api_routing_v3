import "./App.css";
import { Routes, Route } from "react-router-dom"
import { Home } from "./Views/Home";
import { Person } from "./Views/Person";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Person />} />
      </Routes>
    </div>
  )
}

export default App;
