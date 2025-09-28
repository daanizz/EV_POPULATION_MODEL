import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function editTask() {
  const location = useLocation;
  const { task } = location.state || {};
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [lastDate, setLastDate] = useState("");

  useEffect(() => {
    setTitle(task.title);
    setContent(task.content);
    setCategory(task.category);
    setLastDate(task.lastDate);
  });

  /**@type {React.FormEventHandler<HTMLFormElement>}*/
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      {task ? (
        <form onSubmit={handleSubmit()}>
          <p>{title}</p> <p>Details:</p>
          <input
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
          />
          <p>Last Date:</p>
          <input
            type="date"
            value={content}
            onChange={(e) => {
              setLastDate(e.currentTarget.value);
            }}
          />
          <button type="submit">Make changes</button>
        </form>
      ) : (
        <p>Something went wrong(No task recieved)</p>
      )}
    </div>
  );
}
