import { useWizard } from "react-use-wizard";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

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
    <>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input
            type="text"
            value={discoName}
            onChange={handleInputChange}
            name="discoName"
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

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handleInputChange}
            name="password"
          />
        </FormControl>

        <Button onClick={() => previousStep()}>Previous</Button>
        <Button type="submit">Register</Button>
      </form>
    </>
  );
}

export default EmailPassStep;
