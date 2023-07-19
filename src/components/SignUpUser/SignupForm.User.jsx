import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Button, FormControl, FormLabel, Input, Flex } from "@chakra-ui/react";

const SignupFormUser = () => {
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
      .signupUser(signupData)
      .then(({ data }) => {
        setSignupData({ username: "", name: "", email: "", password: "" });

        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  const { username, name, password, email } = signupData;

  return (
    <Flex
      width="100vw"
      height="60vh"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={handleInputChange}
            name="username"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={handleInputChange}
            name="name"
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

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={handleInputChange}
            name="email"
          />
        </FormControl>

        <div>
          <Button colorScheme="teal" variant="solid" type="submit">
            Create user
          </Button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </Flex>
  );
};

export default SignupFormUser;
