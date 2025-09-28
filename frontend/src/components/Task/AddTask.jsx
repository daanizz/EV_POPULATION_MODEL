import { useContext, useState } from "react";
import { AuthContext } from "../../contexts.jsx";
import { Link, useNavigate } from "react-router";
import "./addTask.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function addTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [lastDate, setLastDate] = useState("");
  const { user, token } = useContext(AuthContext);

  /**@type {React.FormEventHandler<HTMLFormElement>} */
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(userId);
    const userId = user.id;
    const response = await fetch(`${API_URL}/task/`, {
      method: "POST",
      body: JSON.stringify({ title, content, lastDate, category, userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      alert("data stored succesfully..");
    } else {
      const error = await response.json();
      alert(error.error);
    }
    navigate("/");
  }

  return (
    <div className="add-task-container">
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
          className="add-task-input"
        />

        <input
          type="textArea"
          placeholder="Details"
          value={content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
          className="add-task-textarea"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.currentTarget.value);
          }}
          className="add-task-select"
        >
          <option value="">Select Category</option>
          <option value="Academic">Academic</option>
          <option value="Hobby">Hobby</option>
          <option value="Skill">Skill</option>
        </select>

        <input
          type="date"
          placeholder="Last date"
          value={lastDate}
          onChange={(e) => {
            setLastDate(e.currentTarget.value);
          }}
          className="add-task-date"
        />
        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </form>
    </div>
  );
}
