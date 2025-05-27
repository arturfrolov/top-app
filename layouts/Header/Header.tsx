'use client';

import {HeaderProps} from '@/layouts/Header/Header.props';
import styles from './Header.module.css';
import Logo from '../logo.svg';
import cn from 'classnames';
import Link from 'next/link';
import {ButtonIcon} from '@/components';
import {motion, useReducedMotion} from 'framer-motion';
import {Sidebar} from '@/layouts';
import {useEffect, useState} from 'react';
import { usePathname } from 'next/navigation';

export const Header = ({className, menu, firstCategory, ...props}: HeaderProps) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const pathname  = usePathname();
	const shouldReduceMotion    = useReducedMotion();

	useEffect(() => setIsOpened(false), [pathname]);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20,
			}
		},
		closed: {
			opacity: shouldReduceMotion ? 1 : 0,
			x: '100%',
		}
	};

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Link href='/'>
				<Logo className={styles.logo}/>
			</Link>
			<ButtonIcon icon={'menu'} appearance={'white'} onClick={() => setIsOpened(true)}/>
			<motion.div
				className={styles.mobileMenu}
				variants={variants}
				initial='closed'
				animate={isOpened ? 'opened' : 'closed'}
			>
				<Sidebar className={styles.sidebar} menu={menu} firstCategory={firstCategory}/>
				<ButtonIcon className={styles.menuClose} icon={'close'} appearance={'white'} onClick={() => setIsOpened(false)}/>
			</motion.div>
		</header>
	);
};
