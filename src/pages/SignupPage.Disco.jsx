import { Link } from "react-router-dom";
import discoService from "../services/disco.service";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function SignupPageDisco() {
  const [discos, setDiscos] = useState([]);
  const [searchName, setSearchName] = useState("");

  const getDiscos = async () => {
    try {
      const res = await discoService.getAllDiscos();
      setDiscos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDiscos();
  }, []);


  const showfilteredDiscos = (search) => {
    const copy = {...discos}
    const filteredDiscos = copy.filter((disco) => {
      return disco.name.toLowerCase().includes(search.toLowerCase());
    });
    setDiscos(filteredDiscos)
  }

  return (
    <>
      <form>
        <FormControl>
          <Input placeholder="Search for your disco" />
        </FormControl>
        <Button type="submit">Search disco</Button>
      </form>
      <Link to="/">VOLVER</Link>
    </>
  );
}
