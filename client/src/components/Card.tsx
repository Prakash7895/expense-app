import { CardProps, Card as NextUICard } from '@nextui-org/react';
import { FC } from 'react';

const Card: FC<CardProps> = (props) => {
  return <NextUICard {...props}>{props.children}</NextUICard>;
};

export default Card;
