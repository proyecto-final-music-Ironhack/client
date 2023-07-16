import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import uploadService from "../../services/upload.service";
import userService from "../../services/user.service";
import { AuthContext } from "../../context/auth.context";
import { cloneWith } from "lodash";
import { Button, Spinner } from "@chakra-ui/react";

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
      ) // 1 second delay, adjust as necessary.
        .then(() => {
          navigate(`/events`);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Image:
          <input type="file" name="image" onChange={uploadUserImage} />
        </label>
        <Button type="submit" value="Submit" disabled={loadingImage}>
          {loadingImage ? <Spinner /> : "Edit"}
        </Button>
      </form>
    </>
  );
};

export default UserEdit;
