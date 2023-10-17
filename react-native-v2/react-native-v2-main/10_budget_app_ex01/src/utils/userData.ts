// import moment from 'moment';
import dayjs from 'dayjs';
import {convertAmount} from '.';
import {IUser} from '../ts/interfaces/user';

export const getOrderedPayments = ({user}: IUser) => {
  const incomes = user.incomes;
  const expenses = user.expenses;
  const [firstname, lastname] = user.user;

  const returnPayment = (paymentArray: any) =>
    paymentArray.map((payment: any) => ({
      date: payment.date,
      amount: payment.amount,
      category: payment.category,
      comments: payment.comments,
      firstname: firstname,
      lastname: lastname,
    }));

  const incomesData = returnPayment(incomes);
  const expensesData = returnPayment(expenses);

  const orderedData = [...incomesData, ...expensesData].sort(
    // (a, b) => moment(a.date).unix()  - moment(b.date).unix(),
    (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
  );

  // console.log(
  //   'NOW         IS,NOW         IS,NOW         IS,NOW         IS,NOW IS:',
  //   new Date(Date.now()),
  // );
  // console.log(orderedData.map(dat => dat.date));

  return [...orderedData].reverse();
};
