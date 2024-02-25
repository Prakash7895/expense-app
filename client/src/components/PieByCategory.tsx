import { useEffect, useState } from 'react';
import DonutChart from './DonutChart';
import { useAppSelector } from '../utils/types';
import { getCategory } from '../utils/store/categorySlice';
import axiosInstance from '../utils/axiosInstance';
import useCurrency from '../hooks/useCurrency';
import Select from './Select';
import { SelectItem } from '@nextui-org/react';
import { DateTime } from 'luxon';
import { months } from '../utils/constants';

const PieByCategory = () => {
  const categories = useAppSelector(getCategory);
  const [data, setData] = useState([]);
  const [sum, setSum] = useState(0);
  const [date, setDate] = useState({
    startDate: DateTime.now().startOf('month').toISODate().replace(/-/g, '/'),
    endDate: DateTime.now().endOf('month').toISODate().replace(/-/g, '/'),
  });

  const currency = useCurrency();

  console.log('date111', date);

  useEffect(() => {
    if (categories.length) {
      axiosInstance
        .get(
          `/api/transaction/stats?startDate=${date.startDate}&endDate=${date.endDate}&type=debit`
        )
        .then((res) => {
          let s = 0;
          let arr = res.data.data?.map((el: any) => {
            const dt = categories.find((c) => c.id === el.categoryId);
            s += el.amount;
            return {
              ...el,
              name: dt?.name,
              value: el.amount,
            };
          });
          setSum(s);
          setData(arr || []);
        });
    }
  }, [categories, date]);

  const year = DateTime.now().startOf('year').get('year');

  return (
    <div className='relative bg-default-100 rounded-md pt-10'>
      <p className='absolute left-2.5 top-2.5'>Expenses</p>
      <Select
        size='sm'
        label='Month'
        className='w-52 absolute z-50 right-2.5 top-2.5'
        variant='bordered'
        selectedKeys={[date.startDate]}
        onChange={(e) => {
          const monthStartDate = e.target.value;
          console.log('monthStartDate', monthStartDate);
          if (monthStartDate) {
            const stDate = DateTime.fromJSDate(new Date(monthStartDate))
              .startOf('month')
              .toISODate()
              ?.replace(/-/g, '/');

            const eDate = DateTime.fromJSDate(new Date(monthStartDate))
              .endOf('month')
              .toISODate()
              ?.replace(/-/g, '/');

            if (stDate && eDate) {
              setDate({
                startDate: stDate!,
                endDate: eDate!,
              });
            }
          }
        }}
        items={months.map((el) => ({ ...el, value: `${year}${el.value}` }))}
      >
        {(option: any) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        )}
      </Select>
      <DonutChart
        id='expenses'
        className='h-80'
        data={data}
        centerLabel={`${currency?.symbol}${sum}`}
      />
    </div>
  );
};

export default PieByCategory;
