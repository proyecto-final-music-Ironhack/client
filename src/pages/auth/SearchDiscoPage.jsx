import { Link } from "react-router-dom";
import discoService from "../../services/disco.service";
import {
  Button,
  FormControl,
  Flex,
  FormHelperText,
  FormLabel,
  Input,
  Center,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useEffect, useState } from "react";

export default function SearchDiscoPage() {
  const [discos, setDiscos] = useState([]);
  const [filteredDiscos, setfilteredDiscos] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const getDiscos = async () => {
    try {
      const res = await discoService.getAllDiscos();
      setDiscos(res.data);
      setfilteredDiscos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDiscos();
  }, []);

  const inputOnChange = () => {
    setShowButton(true);
  };

  return (
    <>
      <Flex pt="48" justify="center" align="center" w="full">
        <FormControl w="60">
          <FormLabel>Search for your club</FormLabel>
          <AutoComplete>
            <AutoCompleteInput />
            <AutoCompleteList>
              {filteredDiscos.map((disco) => (
                <AutoCompleteItem
                  key={disco._id}
                  value={disco.name}
                  onClick={() => inputOnChange()}
                >
                  {disco.name} ({disco.province})
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
          {/* <FormHelperText>Can't find your local? Contact with us.</FormHelperText> */}
        </FormControl>
      </Flex>
      <Text>Can't find your club? Contact with us.</Text>
      {showButton && <Link to="/signup/disco">Continuar</Link>}
    </>
  );
}
