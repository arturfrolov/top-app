// 'use client';

// import Image from 'next/image';
// import {useState} from 'react';
import {Button, Htag, P, Tag} from '@/components';



export default async function Home() {

  // const [rating, setRating] = useState<number>(2);

  return (
    <>
      <Htag tag='h1'>Курсы по Photoshop</Htag>
      <Button appearance={'primary'} className='wqeqw'>Узнать подробнее</Button>
      <Button appearance={'ghost'} arrow={'right'}>Узнать подробнее</Button>
      <P size={'l'}>Большой</P>
      <P>Средний</P>
      <P size={'s'}>Маленький</P>
      <Tag size={'m'} color={'grey'}>Grey</Tag>
      <Tag color={'green'}>Green</Tag>
      <Tag color={'ghost'}>Ghost</Tag>
      <Tag size={'m'} color={'red'}>Red</Tag>
      <Tag href={'#'} color={'primary'}>primary</Tag>
      {/*<Rating rating={rating} isEditable={true} setRating={setRating}></Rating>*/}


    </>
  );
}
