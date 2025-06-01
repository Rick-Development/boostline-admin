export type CryptoOrderStatus = 'success' | 'pending' | 'failed';

export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
}

export interface Transaction {
  currency: string;
  id: number;
  trans_id: string;
  user_id: number;
  title: string;
  type: 'debit' | 'credit';
  amount: string;
  method: string;
  description: string;
  balance: string;
  status: CryptoOrderStatus;
  date: string;
  createdAt: string;
  updatedAt: string;
}
