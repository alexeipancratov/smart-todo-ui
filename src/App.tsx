import TodosPage from "./components/todos/TodosPage";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import AboutPage from "./components/about/AboutPage";
import Header from "./components/common/Header";

function App() {
  return (
    <div className="app">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-center mb-4 mt-2">Smart ToDo</h1>
            <Header />
            <Switch>
              <Route exact path="/" component={TodosPage} />
              <Route path="/about" component={AboutPage} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
