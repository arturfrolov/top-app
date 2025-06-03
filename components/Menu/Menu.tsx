'use client';

import {useEffect, useState, KeyboardEvent} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';
import {FirstLevelMenuItem, MenuItem, PageItem} from '@/interfaces/menu.interface';
import {TopLevelCategory} from '@/interfaces/page.interface';
import styles from './Menu.module.css';
import {firstLevelMenu} from '@/helpers/helpers';
import {AnimatePresence, motion} from 'framer-motion';


export interface MenuProps {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
}

export default function Menu({menu: serverMenu, firstCategory}: MenuProps) {

	const [openedFirst, setOpenedFirst] = useState<TopLevelCategory | null>(firstCategory);

	const [menuState, setMenuState] = useState<MenuItem[]>(
		serverMenu.map(item => ({...item, isOpened: false}))
	);

	const firstVariants = {
		open: {
			height: 'auto',
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				ease: 'easeInOut',
			},
		},
		close: {
			height: 0,
			opacity: 0,
			transition: {
				when: 'afterChildren',
				ease: 'easeInOut',
				duration: 0.4,
			},
		}
	};

	const variants = {
		visible: {
			marginBottom: 20,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		hidden: {
			marginBottom: 0
		}
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 'auto',
			marginBottom: 10
		},
		hidden: {
			height: 0,
			opacity: 0
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

	async function clickFirstLevel(item: FirstLevelMenuItem) {
		// сворачиваем, если тот же
		if (openedFirst === item.id) {
			setOpenedFirst(null);
			return;
		}

		setOpenedFirst(item.id);

		if (item.id === firstCategory) {
			setMenuState(
				serverMenu.map(m => ({...m, isOpened: false}))
			);
			return;
		}

		try {
			const res = await fetch(`/api/menu?id=${item.id}`);
			const data = await res.json() as MenuItem[];

			setMenuState(
				data.map(m => ({...m, isOpened: false}))
			);
		} catch (e) {
			console.error('Не удалось получить меню', e);
		}
	}

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
						<button
							className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: firstLevelMenuItem.id === openedFirst
							})}
							aria-expanded={firstLevelMenuItem.id === openedFirst}
							onClick={() => clickFirstLevel(firstLevelMenuItem)}
						>
							{firstLevelMenuItem.icon}
							<span>
								{firstLevelMenuItem.name}
							</span>
						</button>
						<AnimatePresence initial={false} mode="wait">
							{firstLevelMenuItem.id === openedFirst && (
								<motion.div
									key={firstLevelMenuItem.id}
									variants={firstVariants}
									initial="close"
									animate="open"
									exit="close"
									style={{ overflow: 'hidden' }}
								>
									{buildSecondLevel(menu, firstLevelMenuItem)}
								</motion.div>
							)}
						</AnimatePresence>
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

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
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
