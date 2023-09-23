import { Skeleton, TableCell, TableRow } from "@mui/material";

const AccountListSkeleton = () => {

  return (
    <>
      <TableRow>
        <TableCell width={"10%"}>
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            animation="wave"
          />
        </TableCell>
        <TableCell width={"25%"} animation="wave">
          <Skeleton />
        </TableCell>
        <TableCell width={"25%"} animation="wave">
          <Skeleton />
        </TableCell>
        <TableCell width={"15%"} animation="wave">
          <Skeleton />
        </TableCell>
        <TableCell width={"15%"} animation="wave">
          <Skeleton />
        </TableCell>
        <TableCell width={"20%"} animation="wave">
          <Skeleton />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell width={"10%"}>
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            animation="wave"
          />
        </TableCell>
        <TableCell width={"25%"} animation="wave">
          <Skeleton />
        </TableCell>
        <TableCell width={"25%"} animation="wave">
          <Skeleton />
        </TableCell>
        <TableCell width={"15%"} animation="wave">
          <Skeleton />
        </TableCell>
        <TableCell width={"15%"} animation="wave">
          <Skeleton />
        </TableCell>
        <TableCell width={"20%"} animation="wave">
          <Skeleton />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell width={"10%"}>
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            animation="wave"
          />
        </TableCell>
        <TableCell width={"25%"} animation="wave">
          <Skeleton />
        </TableCell>
        <TableCell width={"25%"} animation="wave">
          <Skeleton />
        </TableCell>
        <TableCell width={"15%"} animation="wave">
          <Skeleton />
        </TableCell>
        <TableCell width={"15%"} animation="wave">
          <Skeleton />
        </TableCell>
        <TableCell width={"20%"} animation="wave">
          <Skeleton />
        </TableCell>
      </TableRow>
    </>
  );
};

export default AccountListSkeleton;
