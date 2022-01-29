import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';
interface ITransaction {
  id: number;
  title: string;
  ammount: number;
  type: 'deposit' | 'withdraw';
  category: string;
  createdAt: string;
}

interface ITransactionContext {
  children: ReactNode;
}
interface IResponseTransaction {
  data: { transactions: SetStateAction<ITransaction[]> };
}
type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;
interface ITransactionContextData {
  transactions: ITransaction[];
  CreateTransaction: (transactions: ITransactionInput) => Promise<void>;
}
export const TransactionContext = createContext<ITransactionContextData>(
  {} as ITransactionContextData
);

export function TransactionsProvider({ children }: ITransactionContext) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  useEffect(() => {
    api
      .get('transactions')
      .then((response: IResponseTransaction) =>
        setTransactions(response.data.transactions)
      );
  }, []);

  async function CreateTransaction(
    transactionInput: ITransactionInput
  ): Promise<void> {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionContext.Provider value={{ transactions, CreateTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  return context;
}
