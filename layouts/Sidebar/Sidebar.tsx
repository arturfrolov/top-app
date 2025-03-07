import {SidebarProps} from '@/layouts/Sidebar/Sidebar.props';
import styles from './Sidebar.module.css';
import cn from 'classnames';

export const Sidebar = ({ ...props}: SidebarProps) => {
	return (
		<div className={styles.sidebar} {...props}>
			Sidebar
		</div>
	);
};
