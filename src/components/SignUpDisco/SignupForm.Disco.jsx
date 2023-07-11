import { Wizard } from "react-use-wizard";
import EmailPassStep from "./EmailPassStep";
import SearchDiscoStep from "./SearchDiscoStep";
import { useState } from "react";

function SignupFormDisco() {
  const Footer = () => <p>Can't find your club in our database? Contact with us</p>;
  const Header = () => <h2>Register your club!</h2>;
  const [discoName, setDiscoName] = useState(null);

  return (
    <Wizard header={<Header />} footer={<Footer />}>
      <SearchDiscoStep setDiscoName={setDiscoName} />
      <EmailPassStep discoName={discoName} />
    </Wizard>
  );
}

export default SignupFormDisco;
