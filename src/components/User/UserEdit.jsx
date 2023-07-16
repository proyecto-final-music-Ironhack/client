import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import uploadService from "../../services/upload.servide";
import userService from "../../services/user.service";

const UserEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleNameChange = (event) => setName(event.target.value);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    try {
      await uploadService.uploadImage(formData);
      console.log(`Updated user with name: ${name} and image: ${image.name}`);
    } catch (error) {
      console.log("An error occurred while updating the user.", error);
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
          <input type="file" onChange={handleImageChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default UserEdit;
