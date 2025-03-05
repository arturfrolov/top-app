// import Image from 'next/image';
import {Button, Htag} from '@/components';


export default function Home() {
  return (
    <>
      <Htag tag='h1'>Курсы по Photoshop</Htag>
      <Button appearance={'primary'} className='wqeqw'>Узнать подробнее</Button>
      <Button appearance={'ghost'} arrow={'right'}>Узнать подробнее</Button>
    </>
  );
}
