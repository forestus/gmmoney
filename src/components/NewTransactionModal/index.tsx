import Modal from 'react-modal';
import closeImg from '../../assets/fechar.svg';
import entrada from '../../assets/entrada.svg';
import saida from '../../assets/saida.svg';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { CreateTransaction } = useTransactions();
  const [title, setTitle] = useState('');
  const [ammount, setAmmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit');
  async function handleCreatenewTransaction(event: FormEvent) {
    event.preventDefault();
    await CreateTransaction({
      title,
      type,
      ammount,
      category,
    });
    setTitle('');
    setAmmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>
      <Container onSubmit={handleCreatenewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={ammount}
          onChange={(event) => setAmmount(Number(event.target.value))}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {
              setType('deposit');
            }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={entrada} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => {
              setType('withdraw');
            }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={saida} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
