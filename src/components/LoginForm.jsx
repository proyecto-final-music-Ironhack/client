import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { Button, FormControl, FormLabel, Input, Flex, Container, Text, Heading } from "@chakra-ui/react";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await authService.login(loginData);
      storeToken(data.authToken);
      await authenticate();
      navigate("/events");
    } catch (err) {
      console.error(err);
    }
  };

  const { password, email } = loginData;

  return (
    <>
      <Container mt="20px" mb="20px">
        <Heading textAlign='center'>Log in</Heading>
      </Container>
      <Container>
        <Text>
          <Flex alignItems="center" justifyContent="center">
            <form onSubmit={handleSubmit}>
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

              <Flex alignItems="center" mt={4}>
                <Button className="main-button" mr="20px"  type="submit">
                  Log in
                </Button>
                <Link to="/user-type">Sign up</Link>
              </Flex>
            </form>
          </Flex>
        </Text>
      </Container>
    </>
  );
};

export default LoginForm;
