import React from "react";
import TodosPage from "./components/todos/TodosPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-center mb-4 mt-2">Smart ToDo</h1>
            <TodosPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
