import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Container,
} from "@chakra-ui/react";

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
    <Container>
      <Text>
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
                bgColor={"black"}
                borderColor={"#CAFA00"}
                color={"white"}
                type="text"
                value={username}
                onChange={handleInputChange}
                name="username"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                bgColor={"black"}
                borderColor={"#CAFA00"}
                color={"white"}
                type="text"
                value={name}
                onChange={handleInputChange}
                name="name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                bgColor={"black"}
                borderColor={"#CAFA00"}
                color={"white"}
                type="password"
                value={password}
                onChange={handleInputChange}
                name="password"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                bgColor={"black"}
                borderColor={"#CAFA00"}
                color={"white"}
                type="email"
                value={email}
                onChange={handleInputChange}
                name="email"
              />
            </FormControl>

            <Flex justifyContent="space-between" alignItems="center" mt={4}>
              <Button bg={"#CAFA00"} variant="solid" type="submit">
                Create user
              </Button>
              <Link to="/login">Log in</Link>
            </Flex>
          </form>
        </Flex>
      </Text>
    </Container>
  );
};

export default SignupFormUser;
