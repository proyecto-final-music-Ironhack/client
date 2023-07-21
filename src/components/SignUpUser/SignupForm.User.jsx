import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import claim from "../../images/you-bring-the-beat.png";
import { Button, FormControl, FormLabel, Input, Flex, Text, Container, Image } from "@chakra-ui/react";

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
        <Flex alignItems="center" justifyContent="center" flexDirection="column" mt="20px">
          <Image w="40%" mb="20px" src={claim} alt="claim" />
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
            <FormControl mt="10px">
              <FormLabel>Name</FormLabel>
              <Input bgColor={"black"} borderColor={"#CAFA00"} color={"white"} type="text" value={name} onChange={handleInputChange} name="name" />
            </FormControl>

            <FormControl mt="10px">
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

            <FormControl mt="10px">
              <FormLabel>Email</FormLabel>
              <Input bgColor={"black"} borderColor={"#CAFA00"} color={"white"} type="email" value={email} onChange={handleInputChange} name="email" />
            </FormControl>

            <Flex alignItems="center" mt={4}>
              <Button className="main-button" mr="20px" type="submit">
                Sign up
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
