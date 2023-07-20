import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import uploadService from "../../services/upload.service";
import userService from "../../services/user.service";
import { AuthContext } from "../../context/auth.context";
import {
  Button,
  Spinner,
  Container,
  Text,
  Flex,
  Heading,
  Input,
} from "@chakra-ui/react";

const UserEdit = () => {
  const { id } = useParams();
  const { setUser, user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name);
  const [image, setImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const navigate = useNavigate();
  const handleNameChange = (event) => setName(event.target.value);

  const uploadUserImage = async (event) => {
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    try {
      const { data } = await uploadService.uploadImage(formData);
      setImage(data.cloudinary_url);
    } catch (error) {
      console.error(
        "Ocurrió un error durante la actualización del usuario.",
        error
      );
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = await userService.updateUser(id, { name, image });
      setLoadingImage(false);

      // Create a new promise that resolves after a small delay.
      new Promise((resolve) =>
        setTimeout(() => {
          setUser(updatedUser);
          resolve();
        }, 1000)
      ).then(() => {
        navigate(`/events`);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Text>
        <Heading mb={"10px"}>Edit your profile:</Heading>
        <Flex flexDirection={"column"} alignItems="center">
          {" "}
          {/* Establecer flexDirection en "column" */}
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <br />
            <Input
              bgColor={"black"}
              borderColor={"#CAFA00"}
              color={"white"}
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
            <br />
            <label>
              Image:
              <Input
                pt={"4px"}
                bgColor={"black"}
                borderColor={"#CAFA00"}
                color={"white"}
                type="file"
                name="image"
                onChange={uploadUserImage}
              />
            </label>
            <br />
            <Button
              mt={"20px"}
              bg={"#CAFA00"}
              color={"black"}
              type="submit"
              value="Submit"
              disabled={loadingImage}
            >
              {loadingImage ? <Spinner /> : "Edit"}
            </Button>
          </form>
        </Flex>
      </Text>
    </Container>
  );
};

export default UserEdit;
