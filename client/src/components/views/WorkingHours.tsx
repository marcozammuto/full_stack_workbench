import { useEffect } from "react";
import { useDays } from "../../context/index";
import DayTable from "../features/working-hours/DayTable";
import InsertDay from "../features/working-hours/InsertDay";
import { useApi } from "../../hooks/useApi";
import PageHeading from "../shared/PageHeading";

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
      <PageHeading
        title="Working Hours"
        subtitle="Track your working hours with Prisma, third-party APIS and lookup data"
      />
      <DayTable days={days} />
      <hr />
      <InsertDay />
    </>
  );
};

export default WorkingHours;
