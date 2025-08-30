import NavBar from "../Outline/NavBar.jsx";
import Footer from "../Outline/Footer.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts.jsx";
const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchAllTasks() {
      try {
        if (isLoggedIn) {
          const response = await fetch(`${API_URL}/task/user/${user.id}`);
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
    <>
      <NavBar />
      <div>
        <ul className="Task-Container">
          {tasks.length === 0 ? (
            <li>No task found</li>
          ) : (
            tasks.map((task) => (
              <ul key={task._id}>
                <li>
                  <Link className="Task-Card" to={`/task/${task._id}`}>
                    {task.title}
                  </Link>
                </li>
                <li>{task.category}</li>
                <button onClick={() => handleDelete(task._id)}>
                  Delete Task
                </button>
              </ul>
            ))
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
}
