import {convertAmount} from '../utils';

const {UUID} = Realm.BSON;

export const setUserJsonToDB = (user: any) => {
  return {
    _id: user._id,
    user: user.user,
    incomes: user.incomes.map(income => ({
      date: income.date,
      amount: convertAmount(income.amount),
      category: income.category,
      comments: income.comments,
      _id_income: income._id_income,
    })),
    expenses: user.expenses.map(expense => ({
      date: expense.date,
      amount: convertAmount(expense.amount),
      category: expense.category,
      comments: expense.comments,
      _id_income: expense._id_income,
    })),
  };
};

export const setUserToDatabase = () => {};
export const setPayment = () => {};
