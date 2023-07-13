import { useEffect, useState } from "react";
import DiscoProfile from "../../../components/Disco/DiscoProfile";
import { useParams } from "react-router-dom";
import discoService from "../../../services/disco.service";

export const DiscoPage = () => {
  const [disco, setDisco] = useState(null);

  const { id } = useParams();
  console.log(id);

  const getDisco = async () => {
    try {
      const { data } = await discoService.getOneDisco(id);
      console.log(data);
      setDisco(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDisco();
  }, [id]);

  return <DiscoProfile id={id} disco={disco} />;
};
