import "./App.css";
import Todo_Form from "./component/Todo_Form";
import TodoPage from "./pages/TodoPage";
import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/todo-form" element={<Todo_Form/> } />
      </Routes>
    </>
  );
}

export default App;
