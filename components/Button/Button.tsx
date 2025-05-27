'use client';

import {ButtonProps} from '@/components/Button/Button.props';
import styles from './Button.module.css';
import cn from 'classnames';
import ArrowIcon from './arrow.svg';
import { motion } from 'framer-motion';

export const Button = ({appearance, arrow = 'none', children, className, ...props}: ButtonProps) => {
	return (
		<motion.button
			whileHover={{scale: 1.05}}
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
		</motion.button>
	);
};
