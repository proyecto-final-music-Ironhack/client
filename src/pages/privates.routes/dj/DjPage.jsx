import { useEffect, useState } from "react";
import DjProfile from "../../../components/Dj/DjProfile";
import { useParams } from "react-router-dom";
import djService from "../../../services/dj.service";

export const DjPage = () => {
  const [dj, setDj] = useState(null);
  const { djId } = useParams();


  const getDj = async () => {
    try {
      const { data } = await djService.getOneDj(djId);
      console.log(data);
      setDj(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDj();
  }, [djId]);

  return <DjProfile djId={djId} dj={dj} />;
};
