import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const SignupFormDj = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authService
      .signupDj(signupData)
      .then(({ data }) => {
        setSignupData({ username: "", name: "", email: "", password: "" });

        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const { username, name, password, email } = signupData;

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input type="text" value={username} onChange={handleInputChange} name="username" />
      </FormControl>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input type="text" value={name} onChange={handleInputChange} name="name" />
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={handleInputChange} name="password" />
      </FormControl>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={handleInputChange} name="email" />
      </FormControl>

      <div>
        <Button colorScheme="teal" variant="solid" type="submit">
          Create Dj
        </Button>
        <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default SignupFormDj;
