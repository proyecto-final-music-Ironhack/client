import { useEffect, useState } from "react";
import DjProfile from "../../../components/Dj/DjProfile";
import { useParams } from "react-router-dom";
import djService from "../../../services/dj.service";

export const DjPage = () => {
  const [dj, setDj] = useState(null);

  const { id } = useParams();
  console.log(id);

  const getDj = async () => {
    try {
      const { data } = await djService.getOneDj(id);
      console.log(data);
      setDj(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDj();
  }, [id]);

  return <DjProfile id={id} dj={dj} />;
};
