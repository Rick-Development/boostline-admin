import { FC, ChangeEvent, useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
  TextField // Import for search input
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import useTransaction from 'src/hooks/useTransaction';

interface Transaction {
  id: number;
  trans_id: string;
  title: string;
  type: string;
  amount: string;
  description: string;
  status: string;
  date: string;
}

interface Filters {
  status?: string;
}

const getStatusLabel = (status: string): JSX.Element => {
  const map = {
    failed: { text: 'Failed', color: 'error' },
    success: { text: 'Success', color: 'success' },
    pending: { text: 'Pending', color: 'warning' }
  };

  const statusInfo = map[status] || { text: 'Unknown', color: 'default' };
  return <Label color={statusInfo.color}>{statusInfo.text}</Label>;
};

const applyFilters = (transactions: Transaction[], filters: Filters) => {
  return transactions.filter((transaction) => {
    return (
      !filters.status ||
      filters.status === 'all' ||
      transaction.status === filters.status
    );
  });
};

interface Trans {
  userId?: string;
}

const RecentOrdersTable = ({ userId }: Trans) => {
  const defaultPage = 0;
  const defaultSize = 10;

  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<Filters>({ status: 'all' });
  const [page, setPage] = useState<number>(defaultPage);
  const [limit, setLimit] = useState<number>(defaultSize);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term state

  const { data, loading, error, refetch } = useTransaction(
    null,
    userId || null,
    page,
    limit,
    searchTerm
  );

  const statusOptions = [
    { id: 'all', name: 'All' },
    { id: 'success', name: 'Success' },
    { id: 'pending', name: 'Pending' },
    { id: 'failed', name: 'Failed' }
  ];

  useEffect(() => {
    if (data?.data?.transactions) {
      setTransactions(data.data.transactions);
    }
  }, [data]);

  // Handle changes in the status filter
  const handleStatusChange = (e: SelectChangeEvent<string>): void => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, status: value }));
  };

  // Handle search input change
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPage(0);
    setSearchTerm(event.target.value);
  };

  // Handle selecting all transactions
  const handleSelectAllTransactions = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedTransactions(
      event.target.checked
        ? transactions.map((transaction) => transaction.id.toString())
        : []
    );
  };

  // Handle selecting an individual transaction
  const handleSelectOneTransaction = (
    event: ChangeEvent<HTMLInputElement>,
    transactionId: string
  ): void => {
    setSelectedTransactions((prevSelected) =>
      prevSelected.includes(transactionId)
        ? prevSelected.filter((id) => id !== transactionId)
        : [...prevSelected, transactionId]
    );
  };

  // Filtered transactions based on the current filters
  const filteredTransactions = useMemo(
    () => applyFilters(transactions, filters),
    [transactions, filters]
  );

  // Select states
  const selectedSomeTransactions =
    selectedTransactions.length > 0 &&
    selectedTransactions.length < transactions.length;
  const selectedAllTransactions =
    selectedTransactions.length === transactions.length;

  return (
    <Card>
      {selectedTransactions.length > 0 && (
        <Box p={2}>
          <BulkActions />
        </Box>
      )}
      <Divider />
      <Box p={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            value={filters.status}
            onChange={handleStatusChange}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          fullWidth
          label="Search Transactions"
          value={searchTerm}
          onChange={handleSearchChange}
          margin="normal"
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllTransactions}
                  indeterminate={selectedSomeTransactions}
                  onChange={handleSelectAllTransactions}
                />
              </TableCell>
              <TableCell>Order Details</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Source</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} align="center" style={{ color: 'red' }}>
                  {error || 'Unknown error'}
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((transaction) => {
                const isTransactionSelected = selectedTransactions.includes(
                  transaction.id.toString()
                );
                return (
                  <TableRow
                    hover
                    key={transaction.id}
                    selected={isTransactionSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isTransactionSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleSelectOneTransaction(
                            event,
                            transaction.id.toString()
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">
                        {transaction.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {format(new Date(transaction.date), 'MMMM dd yyyy')}
                      </Typography>
                    </TableCell>
                    <TableCell>{transaction.trans_id}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell align="right">
                      ₦{numeral(transaction.amount).format('₦0,0.00')}
                    </TableCell>
                    <TableCell align="right">
                      {getStatusLabel(transaction.status)}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit Order">
                        <IconButton color="primary">
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Order">
                        <IconButton color="error">
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data?.data?.totalPages * limit || 0} // Total count for pagination
        page={page} // Use 0-based indexing directly
        rowsPerPage={limit}
        onPageChange={(event, newPage) => {
          const newPageNumber = Math.max(0, newPage); // Prevent negative page number
          setPage(newPageNumber); // Set the new page number
          refetch();
        }}
        onRowsPerPageChange={(event) => {
          setLimit(parseInt(event.target.value, 10));
          setPage(defaultPage); // Reset to first page
          refetch();
        }}
      />
    </Card>
  );
};

export default RecentOrdersTable;
