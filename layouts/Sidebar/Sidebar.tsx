import {SidebarProps} from '@/layouts/Sidebar/Sidebar.props';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import Logo from '../logo.svg';
import Link from 'next/link';

export const Sidebar = ({className, children, ...props}: SidebarProps) => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Link href='/'>
				<Logo className={styles.logo}/>
			</Link>
			<div>Поиск</div>
			{children}
		</div>
	);
};
