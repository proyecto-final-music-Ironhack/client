import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { authenticate, storeToken, error } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    authService
      .login(loginData)
      .then(({ data }) => {
        storeToken(data.authToken);
        authenticate();
        navigate("/events");
      })
      .catch((err) => console.log(err));
  };

  const { password, email } = loginData;

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={handleInputChange}
          name="email"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={handleInputChange}
          name="password"
        />
      </FormControl>

      <div>
        <Button colorScheme="teal" variant="solid" type="submit">
          Login
        </Button>
        <Link to="/signup">Signup</Link>
      </div>
      <p>{error}</p>
    </form>
  );
};

export default LoginForm;
