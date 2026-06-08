import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post("/login", {
        email,
        password
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid Credentials");

      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
        <p>
  Don't have an account?
  <Link to="/register"> Register</Link>
</p>
      </form>
    </div>
  );
}

export default Login;