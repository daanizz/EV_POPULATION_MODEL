import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts.jsx";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const { user, logout, isLoggedIn } = useContext(AuthContext);

  /**@type {React.MouseEventHandler<HTMLLIElement>} */
  function handleLogout(e) {
    e.preventDefault();
    logout();
    alert("Logged Out Successfully");
  }
  useEffect(() => {}, [isLoggedIn]);

  return (
    <nav>
      <ul>
        <li>
          <h1>Task-Wallet</h1>
        </li>
        <li>Tasks</li>
        {isLoggedIn ? (
          <>
            <li>Welcome {user.name}</li>{" "}
            <li>
              <button onClick={handleLogout}>Logout</button>
              <Link to="/task/addTask">Add Task</Link>
            </li>
          </>
        ) : (
          <>
            <li>Hello User....</li>{" "}
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
