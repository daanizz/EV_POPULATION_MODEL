import { useContext } from "react";
import { AuthContext } from "./contexts";
import { useNavigate } from "react-router";

export default function RouterProtector({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    alert("Cant access this page, without logging in!!");
    navigate("/login");
  }
  return children;
}
