// import Image from 'next/image';
import {Button, Htag, P, Tag} from '@/components';


export default function Home() {
  return (
    <>
      <Htag tag='h1'>Курсы по Photoshop</Htag>
      <Button appearance={'primary'} className='wqeqw'>Узнать подробнее</Button>
      <Button appearance={'ghost'} arrow={'right'}>Узнать подробнее</Button>
      <P size={'l'}>Большой</P>
      <P>Средний</P>
      <P size={'s'}>Маленький</P>
      <Tag size={'m'} color={'grey'}>Photoshop</Tag>
      <Tag color={'green'}>Photoshop</Tag>
      <Tag color={'ghost'}>Photoshop</Tag>
      <Tag size={'m'} color={'red'}>Photoshop</Tag>
      <Tag href={'#'} color={'primary'}>Photoshop</Tag>
    </>
  );
}
