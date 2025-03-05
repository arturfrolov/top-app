import {ButtonProps} from '@/components/Button/Button.props';
import styles from './Button.module.css';
import cn from 'classnames';
import ArrowIcon from './arrow.svg';

export const Button = ({appearance, arrow = 'none', children, className, ...props}: ButtonProps) => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost',
			})}
			{...props}
		>
			{children}
			{arrow !== 'none' && <ArrowIcon className={cn(styles.arrow, {
				[styles.down]: arrow == 'down',
			})}></ArrowIcon>}
		</button>
	);
};
