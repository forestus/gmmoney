import { Container } from './styles';
import incomeSvg from '../../assets/entrada.svg';
import outcomeSvg from '../../assets/saida.svg';
import totalSvg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {
  const { transactions } = useTransactions();
  const { deposit, withdraw, total } = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposit += transaction.ammount;
        acc.total += transaction.ammount;
        return acc;
      } else {
        acc.withdraw += transaction.ammount;
        acc.total -= transaction.ammount;
      }
      return acc;
    },
    {
      deposit: 0,
      withdraw: 0,
      total: 0,
    }
  );
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeSvg} alt="Entradas" />
        </header>

        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(deposit)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeSvg} alt="Saídas" />
        </header>
        <strong>
          {'-' +
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(withdraw)}
        </strong>
      </div>
      <div className="hightlight-background">
        <header>
          <p>Total</p>
          <img src={totalSvg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(total)}
        </strong>
      </div>
    </Container>
  );
}
