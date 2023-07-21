import { useWizard } from "react-use-wizard";
import discoService from "../../services/disco.service";
import { Button, FormControl, Flex, Center, Container, Text } from "@chakra-ui/react";
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
    <Container>
      <Text>
        <Flex>
          <FormControl>
            <AutoComplete onChange={(value) => setDiscoName(value)}>
              <AutoCompleteInput className="auto-complete-input" />
              <AutoCompleteList style={{ zIndex: 1, color: "black" }}>
                {discos.map((disco) => (
                  <AutoCompleteItem key={disco._id} value={disco.name}>
                    {disco.name} ({disco.province})
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            </AutoComplete>
          </FormControl>
        </Flex>
        <Center>
          <Button m={"20px"} bg={"#CAFA00"} color={"black"} className="main-button" style={{ zIndex: 0 }} onClick={() => nextStep()}>
            Next
          </Button>
        </Center>
      </Text>
    </Container>
  );
}

export default SearchDiscoStep;
