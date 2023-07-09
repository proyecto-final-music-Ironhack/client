import { Wizard } from "react-use-wizard";
import EmailPassStep from "./EmailPassStep";
import SearchDiscoStep from "./SearchDiscoStep";

function SignupFormDisco() {
  const Footer = () => <p>Can't find your club in our database? Contact with us</p>;
  const Header = () => <h2>Register your club!</h2>;
  return (
    <Wizard header={<Header />} footer={<Footer />}>
      <SearchDiscoStep />
      <EmailPassStep />
    </Wizard>
  );
}

export default SignupFormDisco;
