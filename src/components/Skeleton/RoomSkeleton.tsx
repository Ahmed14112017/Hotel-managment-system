import { Box, Skeleton } from "@mui/material";

export default function RoomSkeleton() {
  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Skeleton variant="text" width={"80px"} height={"80px"} />
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"start"}
        marginBlock={"30px"}
        gap={"30px"}
        width={"100%"}
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <Box
            key={index}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"start"}
            width={"100%"}
          >
            <Skeleton variant="text" width={"70px"} height={"30px"} />
            <Skeleton variant="text" width={"70px"} height={"30px"} />
            <Skeleton variant="text" width={"70px"} height={"30px"} />
            <Skeleton variant="text" width={"70px"} height={"30px"} />
            <Skeleton variant="text" width={"70px"} height={"30px"} />
            <Skeleton variant="text" width={"70px"} height={"30px"} />
            <Skeleton variant="text" width={"70px"} height={"30px"} />
          </Box>
        ))}
      </Box>
    </>
  );
}
