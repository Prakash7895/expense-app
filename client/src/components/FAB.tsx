import { Button } from '@nextui-org/react';
import { FC, ReactNode, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

interface IFAB {
  actionItems: {
    icon: ReactNode;
    label: string;
    description?: string;
    action: () => void;
  }[];
}

const FAB: FC<IFAB> = ({ actionItems }) => {
  const [rotate, setRotate] = useState(false);

  return (
    <>
      <div
        onClick={() => setRotate(false)}
        className={`opacity-30 bg-default-400 origin absolute transition-all rounded-full bottom-5 z-50 right-5 h-12 w-12 ${
          rotate ? 'h-[6000px] w-[6000px] -right-[1000px] -bottom-[900px]' : ''
        }`}
      ></div>
      <div
        className={`flex flex-col-reverse absolute bottom-20 right-5 transition-all h-0 w-0 overflow-hidden ${
          rotate ? 'h-[400px] w-full z-[110]' : ''
        } `}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setRotate(false);
        }}
      >
        {actionItems.map((el) => (
          <div
            key={el.label}
            className='my-5 flex items-center text-right gap-3 justify-end mr-1'
          >
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <p className='text-bold'>{el.label}</p>
              {el.description && (
                <p className='text-bold text-small text-default-400'>
                  {el.description}
                </p>
              )}
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                el.action();
                setRotate(false);
              }}
              className='cursor-pointer'
              isIconOnly
            >
              {el.icon}
            </Button>
          </div>
        ))}
      </div>
      <div className='absolute bottom-5 right-5'>
        <Button
          onClick={() => setRotate((p) => !p)}
          className='rounded-full z-[100]'
          variant='shadow'
          isIconOnly
          size='lg'
        >
          <FaPlus
            className={`transition-all ${rotate ? '-rotate-45' : ''}`}
            size={25}
          />
        </Button>
      </div>
    </>
  );
};

export default FAB;
