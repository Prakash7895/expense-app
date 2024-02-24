import { FC, forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { ControllerRenderProps } from 'react-hook-form';

interface IDatePicker {
  ref?: any;
}

type DatePickerProps = IDatePicker &
  ControllerRenderProps<
    {
      [x: string]: any;
    },
    string
  >;

const DateSelector: FC<DatePickerProps> = forwardRef<
  DatePicker<any>,
  DatePickerProps
>(({ name, onChange, value }, ref) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(value || new Date().toISOString())
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`!pb-6`}>
      <DatePicker
        ref={ref}
        showIcon
        name={name}
        closeOnScroll={true}
        selected={selectedDate}
        onChange={(date: Date) => {
          setSelectedDate(date);
          onChange({
            target: {
              value: date.toISOString(),
            },
          });
        }}
        toggleCalendarOnIconClick
        popperClassName='!z-[200]'
        wrapperClassName={`bg-transparent w-full flex justify-center items-center`}
        className={`classsssss bg-transparent py-1 px-3 !w-full rounded-md outline-none !h-12 !pl-8 !border-2 !border-default-200 ${
          isOpen ? '!border-default-foreground' : ''
        }`}
        onCalendarClose={() => setIsOpen(false)}
        onCalendarOpen={() => setIsOpen(true)}
        calendarIconClassname='!pt-4'
      />
    </div>
  );
});

export default DateSelector;
