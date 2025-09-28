import NavBar from "../Outline/NavBar.jsx";
import Footer from "../Outline/Footer.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts.jsx";
const API_URL = import.meta.env.VITE_API_URL;
import "./Home.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const { isLoggedIn, user, token } = useContext(AuthContext);

  useEffect(() => {
    async function fetchAllTasks() {
      try {
        if (isLoggedIn) {
          const response = await fetch(`${API_URL}/task/user/${user.id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Fetched tasks:", data);
            setTasks(Array.isArray(data) ? data : []);
          } else {
            alert("Something went wrong!!:response,not ok..");
          }
        }
        if (!isLoggedIn) {
          setTasks([]);
        }
      } catch {
        alert("Something went wrong!!:cathc block");
      }
    }

    fetchAllTasks();
  }, [isLoggedIn]);

  async function handleDelete(taskId) {
    const response = await fetch(`${API_URL}/task/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resp = await response.json();
    if (response.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      alert(resp.message);
    } else {
      alert(resp.message);
    }
  }

  return (
    <div className="home-container">
      <NavBar />
      <div className="home-content">
        <ul className="Task-Container">
          {tasks.length === 0 ? (
            <li className="no-tasks">
              <div>
                <p>No task found</p>
                {isLoggedIn ? (
                  <Link to="/task/addTask" className="add-first-task">
                    Add Your First Task
                  </Link>
                ) : (
                  <Link to="/login" className="add-first-task">
                    Login To add task
                  </Link>
                )}
              </div>
            </li>
          ) : (
            tasks.map((task) => (
              <li key={task._id} className="task-item">
                <ul className="task-info">
                  <li>
                    <Link className="Task-Card" to={`/task/${task._id}`}>
                      {task.title}
                    </Link>
                  </li>
                  <li>
                    <span className={`task-category ${task.category}`}>
                      {task.category}
                    </span>
                  </li>
                </ul>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="delete-btn"
                >
                  Delete Task
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
