import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { Button, FormControl, FormLabel, Input, Flex } from "@chakra-ui/react";

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
    <Flex
      width="100vw"
      height="50vh"
      alignItems="center"
      justifyContent="center"
    >
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
            Log in
          </Button>
        </div>
        <p>{error}</p>
      </form>
    </Flex>
  );
};

export default LoginForm;
