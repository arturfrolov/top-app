import {SidebarProps} from '@/layouts/Sidebar/Sidebar.props';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import Logo from '../logo.svg';
import Link from 'next/link';
import {Search} from '@/components';
import Menu from '@/components/Menu/Menu';

export const Sidebar = ({className, allMenus, firstCategory, ...props}: SidebarProps) => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Link href='/'>
				<Logo className={styles.logo}/>
			</Link>
			<Search/>
			<Menu allMenus={allMenus} firstCategory={firstCategory} />
		</div>
	);
};
