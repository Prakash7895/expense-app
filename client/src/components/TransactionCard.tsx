import { CardBody, CardHeader } from '@nextui-org/react';
import Card from './Card';
import { FC } from 'react';

interface TransactionCardProps {
  label: string;
  body: string;
  bodyClassName?: string;
}

const TransactionCard: FC<TransactionCardProps> = ({
  body,
  label,
  bodyClassName,
}) => {
  return (
    <Card className='py-4 text-foreground-600 w-40 self-stretch'>
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
        <p className='text-tiny uppercase font-bold'>{label}</p>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <h4 className={`font-bold text-large ${bodyClassName}`}>{body}</h4>
      </CardBody>
    </Card>
  );
};

export default TransactionCard;
