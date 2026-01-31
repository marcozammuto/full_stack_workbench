import { useEffect } from "react";
import { useDays } from "../../context/DayContext";
import DayTable from "../features/working-hours/DayTable";
import InsertDay from "../features/working-hours/InsertDay";
import { useApi } from "../../hooks/useApi";

const WorkingHours = () => {
  const api = useApi();
  const { days, setDays } = useDays();
  useEffect(() => {
    api
      .get(`/day`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setDays(res.data.data);
        }
      });
  }, []);

  return (
    <>
      <DayTable days={days} />
      <hr />
      <InsertDay />
    </>
  );
};

export default WorkingHours;
