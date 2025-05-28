'use client';

import {SortEnum, SortProps} from '@/components/Sort/Sort.props';
import styles from './Sort.module.css';
import SortIcon from './sort.svg';
import cn from 'classnames';

export const Sort = ({sort, setSort, className, ...props}: SortProps) => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<button
				id="rating"
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort === SortEnum.Rating
				})}
			>
				<SortIcon className={styles.sortIcon} /> По рейтингу
			</button>
			<button
				id="price"
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort === SortEnum.Price
				})}
			>
				<SortIcon className={styles.sortIcon} /> По Цене
			</button>
		</div>
	);
};
