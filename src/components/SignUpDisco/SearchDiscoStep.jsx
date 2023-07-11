import { useWizard } from "react-use-wizard";
import discoService from "../../services/disco.service";
import { Button, FormControl, Flex, FormHelperText, FormLabel, Input, Center, Spinner, Text } from "@chakra-ui/react";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import { useEffect, useState } from "react";

function SearchDiscoStep({ setDiscoName }) {
  const { nextStep } = useWizard();
  const [discos, setDiscos] = useState([]);
  const [filteredDiscos, setfilteredDiscos] = useState([]);
  const [showButton, setShowButton] = useState(false);

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

  const inputOnChange = () => {
    setShowButton(true);
  };

  return (
    <>
      <Flex pt="48" justify="center" align="center" w="full">
        <FormControl w="60">
          <FormLabel>Search for your club</FormLabel>
          <AutoComplete onChange={(value) => setDiscoName(value)}>
            <AutoCompleteInput />
            <AutoCompleteList style={{ zIndex: 1, color: "white" }}>
              {discos.map((disco) => (
                <AutoCompleteItem key={disco._id} value={disco.name}>
                  {disco.name} ({disco.province})
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        </FormControl>
      </Flex>
      <Button style={{ zIndex: 0 }} onClick={() => nextStep()}>
        Next
      </Button>
    </>
  );
}

export default SearchDiscoStep;
