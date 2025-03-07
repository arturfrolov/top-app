import {HeaderProps} from '@/layouts/Header/Header.props';
import styles from './Header.module.css';
import cn from 'classnames';

export const Header = ({ ...props}: HeaderProps) => {
	return (
		<div className={styles.header} {...props}>
			Header
		</div>
	);
};
