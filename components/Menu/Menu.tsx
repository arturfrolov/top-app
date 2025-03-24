'use client';

import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';
import {FirstLevelMenuItem, MenuItem, PageItem} from '@/interfaces/menu.interface';
import {TopLevelCategory} from '@/interfaces/page.interface';
import styles from './Menu.module.css';
import {firstLevelMenu} from '@/helpers/helpers';


export interface MenuProps {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
}

export default function Menu({ menu: serverMenu, firstCategory }: MenuProps) {

	const [menuState, setMenuState] = useState<MenuItem[]>(
		serverMenu.map(item => ({...item, isOpened: false}))
	);

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
							className={styles.secondLevel}
							onClick={() => toggleSecondLevel(menuItem._id.secondCategory)}
						>
							{menuItem._id.secondCategory}
						</div>

						<div className={cn(styles.thirdLevelBlock, {
							[styles.thirdLevelBlockOpened]: menuItem.isOpened,
						})}>
							{buildThirdLevel(menuItem.pages, firstLevelMenuItem.route)}
						</div>
					</div>
				))}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string ) => {
		return (
			pages.map(page => (
				<Link
					href={`/${route}/${page.alias}`}
					key={page._id}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: page.alias === aliasSegment,
					})}
				>
					{page.category}
				</Link>
			))
		);
	};

	return (
		<div className={styles.menu}>
			{buildFirstLevel(menuState)}
		</div>
	);

}
