import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export interface Pagination {
  page: number;
  totalCount: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}
export default function PaginationControlled({
  handleChange,
  page,
  totalCount,
}: Pagination) {
  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={totalCount} page={page} onChange={handleChange} />
    </Stack>
  );
}
