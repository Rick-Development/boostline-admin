import { Card } from '@mui/material';
import { CryptoOrder, Transaction } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import useTransaction from 'src/hooks/useTransaction';
import { useEffect, useState } from 'react';
import useQuery from 'src/hooks/useQuery';

const RecentOrders = () => {
  const query = useQuery();
  const user = query.user || null;
  const {
    data,
    loading: dataLoading,
    error
  } = useTransaction(null, user || null);
  const [cryptoOrders, setCryptoOrders] = useState<Transaction | any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setCryptoOrders(data.transactions);
    }
  }, [data]);

  useEffect(() => {
    setLoading(dataLoading);
  }, [dataLoading]);

  return (
    <Card>
      <RecentOrdersTable
      // cryptoOrders={cryptoOrders}
      // loading={loading}
      // error={error}
      />
    </Card>
  );
};

export default RecentOrders;
