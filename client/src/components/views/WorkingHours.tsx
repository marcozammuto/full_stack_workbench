import { useEffect } from "react";
import { useDays } from "../../context/index";
import DayTable from "../features/working-hours/DayTable";
import InsertDay from "../features/working-hours/InsertDay";
import PageHeading from "../shared/PageHeading";

const WorkingHours = () => {
  const { days, refetchDays } = useDays();

  useEffect(() => {
    refetchDays();
  }, [refetchDays]);

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
