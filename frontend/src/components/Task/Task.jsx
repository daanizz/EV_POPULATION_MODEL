import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../Outline/NavBar.jsx";
import Footer from "../Outline/Footer.jsx";
const API_URL = import.meta.env.VITE_API_URL;
import { AuthContext } from "../../contexts.jsx";
import "./Task.css";

export default function Task() {
  const [task, setTask] = useState(null);
  const [isDone, setIsDone] = useState();
  const { token } = useContext(AuthContext);

  const { id } = useParams();
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(`${API_URL}/task/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTask(data.task);
        setIsDone(data.task.isDone);
      } else {
        alert("something went wrong");
      }
    }

    fetchTasks();
  }, [id]);

  async function changeStatus() {
    if (!task) return;
    try {
      const newState = !isDone;
      const response = await fetch(`${API_URL}/task/${id}`, {
        method: "PUT",
        body: JSON.stringify({ isDone: newState }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // alert(response.status);
      if (response.ok) {
        alert(data.message);
        setIsDone(newState);
        setTask({ ...task, isDone: newState });
        return;
      }
      alert("cant update:", data.message);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="home-container">
      <NavBar />
      <div className="Task-bg">
        {task ? (
          <div className="task-container">
            <h1 className="Title">{task.title}</h1>
            <div className="task-status-row">
              <p
                className={`title-side-isDone ${task.isDone ? "done" : "not-done"}`}
              >
                {task.isDone ? "Done" : "Not Done"}
              </p>
              <p className={`title-side-category ${task.category}`}>
                {task.category}
              </p>
            </div>
            <div className="task-details">
              <div className="content-section">
                <p className="Content-box">{task.content}</p>
              </div>
              <div className="date-section">
                <span className="date-label">Due Date</span>
                <p className="Last-date-box">{task.lastDate}</p>
              </div>
            </div>
            <div className="task-actions">
              <Link to="/" className="action-btn back-btn">
                Back to Tasks
              </Link>
              <Link
                to={`/task/edit/${task._id}`}
                state={{ task }}
                className="action-btn edit-btn"
              >
                Edit Task
              </Link>
              <button onClick={changeStatus} className="action-btn tick-btn">
                {task.isDone ? "mark as not done" : "mark as done"}
              </button>
            </div>
          </div>
        ) : (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading task...</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
