import {SearchProps} from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import {Button, Input} from '@/components';

export const Search = ({className, ...props}: SearchProps) => {
	return (
		<div className={cn(className, styles.search)} {...props}>
			<Input placeholder='Поиск'/>
			<Button appearance={}></Button>
		</div>
	);
};

