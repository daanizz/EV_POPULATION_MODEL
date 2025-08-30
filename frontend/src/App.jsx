import "./App.css";
import LoginForm from "./components/LoginSignup/login.jsx";
import { Route, Routes } from "react-router-dom";
import CreateAc from "./components/LoginSignup/createAc.jsx";
import Home from "./components/Task/Home.jsx";
import Task from "./components/Task/Task.jsx";
import AddTask from "./components/Task/AddTask.jsx";
import RouterProtector from "./RouteProtect.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/createAc" element={<CreateAc />} />
      <Route
        path="/task/:id"
        element={
          <RouterProtector>
            <Task />
          </RouterProtector>
        }
      />
      <Route
        path="/task/addTask"
        element={
          // <RouterProtector>
          <AddTask />
          // </RouterProtector>
        }
      />
    </Routes>
  );
}

export default App;
