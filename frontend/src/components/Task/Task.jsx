import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../Outline/NavBar.jsx";
import Footer from "../Outline/Footer.jsx";
const API_URL = import.meta.env.VITE_API_URL;

export default function Task() {
  const [task, setTask] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(`${API_URL}/task/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTask(data.task);
      } else {
        alert("something went wrong");
      }
    }

    fetchTasks();
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="Task-bg">
        {task && (
          <div className="task-container">
            <h1 className="Title">{task.title}</h1>
            {task.isDone ? (
              <div>
                <p className="title-side-isDone">Done</p>
                <p className="title-side-category">{task.category}</p>
                <p className="Content-box">{task.content}</p>
                <p className="Last-date-box">{task.lastDate}</p>
              </div>
            ) : (
              <div>
                <p className="title-side-isDone">Not Done</p>
                <p className="title-side-category">{task.category}</p>
                <p className="Content-box">{task.content}</p>
                <p className="Last-date-box">{task.lastDate}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
