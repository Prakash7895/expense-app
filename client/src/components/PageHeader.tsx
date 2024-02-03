import { Button } from '@nextui-org/react';
import { FC } from 'react';

interface PageHeaderProps {
  label: string;
  description?: string;
  onPress?: () => void;
  btnLabel?: string;
}

const PageHeader: FC<PageHeaderProps> = ({
  label,
  onPress,
  btnLabel,
  description,
}) => {
  return (
    <div className='w-full flex justify-between items-center'>
      <div>
        <h2 className='text-2xl font-semibold'>{label}</h2>
        <p>{description}</p>
      </div>
      {btnLabel && (
        <Button color='secondary' onPress={onPress}>
          {btnLabel}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
