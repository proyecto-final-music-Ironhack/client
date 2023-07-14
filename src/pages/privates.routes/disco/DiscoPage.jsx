import { useEffect, useState } from "react";
import DiscoProfile from "../../../components/Disco/DiscoProfile";
import { useParams } from "react-router-dom";
import discoService from "../../../services/disco.service";

export const DiscoPage = () => {
  const [disco, setDisco] = useState(null);


  const { discoId } = useParams();

  const getDisco = async () => {
    try {
      const { data } = await discoService.getOneDisco(discoId);
      console.log(data);
      setDisco(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDisco();
  }, [discoId]);

  return <DiscoProfile discoId={discoId} disco={disco} />;
};
