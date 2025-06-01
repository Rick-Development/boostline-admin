import { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  styled,
  Skeleton // Skeleton component from MUI
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { format } from 'date-fns';
import useActivities from 'src/hooks/useActivities';

const ButtonError = styled(Button)(
  ({ theme }) => `
   background: ${theme.colors.error.main};
   color: ${theme.palette.error.contrastText};

   &:hover {
      background: ${theme.colors.error.dark};
   }
`
);

interface ActivityProps {
  userId?: any;
}

const SecurityTab = ({ userId }: ActivityProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data, loading } = useActivities(
    null,
    userId || null,
    page,
    null,
    searchTerm
  );

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box p={2}>
            <Typography variant="h5">Access Logs</Typography>
          </Box>
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Browser</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Date/Time</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading
                  ? Array.from(new Array(5)).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell colSpan={5}>
                          <Skeleton animation="wave" height={50} />
                        </TableCell>
                      </TableRow>
                    ))
                  : data?.data?.activities?.map((log) => (
                      <TableRow key={log.id} hover>
                        <TableCell>{log.browser}</TableCell>
                        <TableCell>{log.ip_address}</TableCell>
                        <TableCell>{log.location}</TableCell>
                        <TableCell>
                          {format(
                            new Date(log.createdAt),
                            'dd MMMM, yyyy - h:mm:ss a'
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <ButtonError
                            size="small"
                            variant="contained"
                            startIcon={<DeleteTwoToneIcon />}
                          >
                            Delete
                          </ButtonError>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={data?.total || 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SecurityTab;
