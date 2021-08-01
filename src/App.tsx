import React from "react";
import TodosPage from "./components/todos/TodosPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>Smart ToDo</h1>
        <TodosPage />
      </div>
    </div>
  );
}

export default App;
