import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Button, Typography } from "@mui/material";
export interface DateRangeState {
  startDate?: Date;
  endDate?: Date;
  key?: string;
}
export interface CalenderProps {
  handleSubmit: () => void;
  range: DateRangeState[];
  setRange: React.Dispatch<React.SetStateAction<DateRangeState[]>>;
  open: boolean;
  closecalender: () => void;
  Opencalender: () => void;
  children?: string;
}
export default function Calender({
  handleSubmit,
  range,
  setRange,
  children,
}: CalenderProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h3"
        component={"h3"}
        color="#152C5B"
        textAlign={"center"}
      >
        {" "}
        Start Booking
      </Typography>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={range}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        type={"submit"}
        className={""}
        
      >
        {children}
      </Button>
    </div>
  );
}
