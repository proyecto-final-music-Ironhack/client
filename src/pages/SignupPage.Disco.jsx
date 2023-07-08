import { Link } from "react-router-dom";
import discoService from "../services/disco.service";
import {
  Button,
  FormControl,
  Flex,
  FormHelperText,
  FormLabel,
  Input,
  Center,
  Spinner,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useEffect, useState } from "react";

export default function SignupPageDisco() {
  const [discos, setDiscos] = useState([]);
  const [filteredDiscos, setfilteredDiscos] = useState([]);

  const getDiscos = async () => {
    try {
      const res = await discoService.getAllDiscos();
      setDiscos(res.data);
      setfilteredDiscos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDiscos();
  }, []);

  const filterBySearch = (event) => {
    const copy = { ...discos };
    const query = event.target.value;
    const filteredDiscos = copy.filter((disco) => {
      return disco.name.toLowerCase().includes(query.toLowerCase());
    });
    setfilteredDiscos(filteredDiscos);
  };

  return (
    <>
      <Flex pt="48" justify="center" align="center" w="full">
        <FormControl w="60">
          <FormLabel>Search for your club</FormLabel>
          <AutoComplete>
            <AutoCompleteInput backgroundColor='white' />
            <AutoCompleteList >
              {filteredDiscos.map((disco) => (
                <AutoCompleteItem
                  key={disco._id}
                  value={disco.name}
                >
                  {disco.name}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
          {/* <FormHelperText>Can't find your local? Contact with us.</FormHelperText> */}
        </FormControl>
      </Flex>

      <Link to="/">VOLVER</Link>
    </>
  );
}
