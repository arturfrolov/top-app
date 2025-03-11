import {FooterProps} from '@/layouts/Footer/Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';
import {format} from 'date-fns';

export const Footer = ({className, ...props}: FooterProps) => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div className={styles.div}>
				OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены
			</div>
			<a href="#" target='_blank' className={styles.a}>
				Пользовательское соглашение
			</a>
			<a href="#" target='_blank' className={styles.a}>
				Политика конфиденциальности
			</a>
		</footer>
	);
};
