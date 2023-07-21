import { useWizard } from "react-use-wizard";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Button, FormControl, FormLabel, Input, Container, Text, Center } from "@chakra-ui/react";

function EmailPassStep({ discoName }) {
  const { previousStep } = useWizard();
  const [signupData, setSignupData] = useState({
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
      .signupDisco({ ...signupData, name: discoName })
      .then(({ data }) => {
        setSignupData({ email: "", password: "" });
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  const { email, password } = signupData;

  return (
    <Container mt="20px">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input
            bgColor={"black"}
            borderColor={"#CAFA00"}
            color={"white"}
            type="text"
            value={discoName}
            onChange={handleInputChange}
            name="discoName"
          />
        </FormControl>

        <FormControl>
          <Text mt="10px" mb="10px">
            Email
          </Text>
          <Input bgColor={"black"} borderColor={"#CAFA00"} color={"white"} type="email" value={email} onChange={handleInputChange} name="email" />
        </FormControl>

        <FormControl>
          <Text mt="10px" mb="10px">
            Password
          </Text>
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
        <Center mt="20px" mb="20px">
          <Button className="main-button" mr="10px" onClick={() => previousStep()}>
            Previous
          </Button>
          <Button className="main-button" type="submit">
            Register
          </Button>
        </Center>
      </form>
    </Container>
  );
}

export default EmailPassStep;
