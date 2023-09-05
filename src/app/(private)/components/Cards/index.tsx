//components
import useComponents from '@/share/components';

// Interface
import { CardsProps } from './Cards.interface';

const Cards = (props: CardsProps) => {
  const { data } = props;
  const { Typography } = useComponents();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${data?.length ?? 0} gap-4`}>
      {data?.map((card) => (
        <div className='bg-white shadow-sm rounded p-4' key={card.title}>
          <Typography variant='h5'>{card.title}</Typography>
          {card.values.map((value) => (
            <Typography variant='h2' className='text-right' key={value}>
              {value}
            </Typography>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Cards;
