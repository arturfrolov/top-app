import {SidebarProps} from '@/layouts/Sidebar/Sidebar.props';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import Logo from '../logo.svg';

export const Sidebar = ({className, children, ...props}: SidebarProps) => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Logo className={styles.logo}/>
			<div>Поиск</div>
			{children}
		</div>
	);
};
