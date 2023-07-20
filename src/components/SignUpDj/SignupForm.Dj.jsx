import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
} from "@chakra-ui/react";

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
      .catch((err) => console.error(err));
  };

  const { username, name, password, email } = signupData;

  return (
    <Container>
      <Text>
        <Flex
          width="100vw"
          height="100vw"
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
              <Button
                bg={"#CAFA00"}
                color={"black"}
                variant="solid"
                type="submit"
              >
                Create Dj
              </Button>
              <Link to="/login">Login</Link>
            </Flex>
          </form>
        </Flex>
      </Text>
    </Container>
  );
};

export default SignupFormDj;
