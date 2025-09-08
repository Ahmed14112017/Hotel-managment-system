import { Button } from "@mui/material";

interface Capacityhandel {
  Addperson: () => void;
  muinsperson: () => void;
  value: number;
  setvalue: any;
}

export default function Capacity({
  Addperson,
  muinsperson,
  value,
}: Capacityhandel) {
  return (
    <>
      <Button onClick={() => muinsperson()}>-</Button>
      {`${value} Person`}
      <Button onClick={() => Addperson()}>+</Button>
    </>
  );
}
