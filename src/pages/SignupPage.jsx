import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div>
      <Link to="/signup/user">Sign up USER</Link>
      <br />
      <Link to="/signup/dj">Sign up DJ</Link>
      <br />
      <Link to="/signup/disco">Sign up DISCO</Link>
    </div>
  );
}
