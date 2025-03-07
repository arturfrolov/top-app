import {FooterProps} from '@/layouts/Footer/Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';

export const Footer = ({ ...props}: FooterProps) => {
	return (
		<div className={styles.header} {...props}>
			Footer
		</div>
	);
};
