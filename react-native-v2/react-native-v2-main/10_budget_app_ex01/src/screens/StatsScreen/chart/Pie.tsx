import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {colors, screenWidth} from '../../../globals';
import {IUser} from '../../../ts/interfaces/user';
import {convertAmount} from '../../../utils';

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
};
const Pie: React.FC<IUser> = ({user}) => {
  const incomes = user.incomes.map(inc => convertAmount(inc.amount));
  const expenses = user.expenses.map(inc => convertAmount(inc.amount));

  const totalIncomes = incomes.reduce((acc, curr) => acc + curr);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr);

  const data = [
    {
      name: 'Seoul',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Beijing',
      population: 527612,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'New York',
      population: 8538000,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={screenWidth - 20}
        height={220}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'0'}
        center={[10, 10]}
        absolute
      />
    </View>
  );
};

export default Pie;

const styles = StyleSheet.create({
  container: {},
});
