'use client';

import {useEffect, useState, KeyboardEvent} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';
import {FirstLevelMenuItem, MenuItem, PageItem} from '@/interfaces/menu.interface';
import {TopLevelCategory} from '@/interfaces/page.interface';
import styles from './Menu.module.css';
import {firstLevelMenu} from '@/helpers/helpers';
import {motion} from 'framer-motion';


export interface MenuProps {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
}

export default function Menu({ menu: serverMenu, firstCategory }: MenuProps) {

	const [menuState, setMenuState] = useState<MenuItem[]>(
		serverMenu.map(item => ({...item, isOpened: false}))
	);

	const variants = {
		visible: {
			marginBottom: 20,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1,
			}
		},
		hidden: {
			marginBottom: 0,
		}
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 'auto',
			marginBottom: 10,
		},
		hidden: {
			height: 0,
			opacity: 0,
		}
	};

	const pathname = usePathname();
	const aliasSegment = pathname.split('/')[2];

	useEffect(() => {
		setMenuState(oldMenu =>
			oldMenu.map(item => {
				const shouldOpen = item.pages.some(page => page.alias === aliasSegment);
				return {...item, isOpened: shouldOpen};
			})
		);
	}, [aliasSegment]);

	function toggleSecondLevel(secondCategory: string) {
		setMenuState(oldMenu =>
			oldMenu.map(item =>
				item._id.secondCategory === secondCategory
					? item.pages.some(page => page.alias === aliasSegment)
						? item
						: {...item, isOpened: !item.isOpened}
					: item
			)
		);
	}

	function toggleSecondLevelKey(key: KeyboardEvent, secondCategory: string) {
		if (key.code === 'Enter' || key.code === 'Space') {
			key.preventDefault();
			toggleSecondLevel(secondCategory);
		}
	}

	const buildFirstLevel = (menu: MenuItem[]) => {
		return (
			<>
				{firstLevelMenu.map(firstLevelMenuItem => (
					<div key={firstLevelMenuItem.route}>
						<Link href={`/${firstLevelMenuItem.route}`}>
							<div className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: firstLevelMenuItem.id === firstCategory,
							})}>
								{firstLevelMenuItem.icon}
								<span>
										{firstLevelMenuItem.name}
								</span>
							</div>
						</Link>

						{firstLevelMenuItem.id === firstCategory && buildSecondLevel(menu, firstLevelMenuItem)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (menu: MenuItem[], firstLevelMenuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondLevelBlock}>
				{menu.map(menuItem => (
					<div key={menuItem._id.secondCategory}>
						<div
							tabIndex={0}
							onKeyDown={(key: KeyboardEvent) => toggleSecondLevelKey(key, menuItem._id.secondCategory)}
							className={styles.secondLevel}
							onClick={() => toggleSecondLevel(menuItem._id.secondCategory)}
						>
							{menuItem._id.secondCategory}
						</div>

						<motion.div
							layout
							variants={variants}
							initial={menuItem.isOpened ? 'visible' : 'hidden'}
							animate={menuItem.isOpened ? 'visible' : 'hidden'}
							className={cn(styles.thirdLevelBlock)}
						>
							{buildThirdLevel(menuItem.pages, firstLevelMenuItem.route, menuItem.isOpened ?? false)}
						</motion.div>
					</div>
				))}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean ) => {
		return (
			pages.map(page => (
				<motion.div key={page._id} variants={variantsChildren}>
					<Link
						href={`/${route}/${page.alias}`}
						tabIndex={isOpened ? 0 : -1}
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: page.alias === aliasSegment,
						})}
					>
						{page.category}
					</Link>
				</motion.div>
			))
		);
	};

	return (
		<nav className={styles.menu} role="navigation">
			{buildFirstLevel(menuState)}
		</nav>
	);

}
