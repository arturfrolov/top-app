'use client';

import React, {useReducer} from 'react';
import {CoursePageClientProps} from './CoursePageClient.props';
import {SortEnum} from '@/components/Sort/Sort.props';
import {Sort} from '@/components/Sort/Sort';
import {sortReducer, SortReducerState} from './sort.reducer';
import {Htag, Product, Tag} from '@/components';
import styles from './CoursePageClient.module.css';

export default function CoursePageClient({ initialProducts, pageTitle }: CoursePageClientProps) {

	const initialState: SortReducerState = {
		sort: SortEnum.Rating,
		products: initialProducts
	};

	const [{products: sortedProducts, sort}, dispatchSort] = useReducer(
		sortReducer,
		initialState,
		(init) => sortReducer(init, { type: init.sort })
	);

	const setSort = (newSort: SortEnum) => {
		dispatchSort({type: newSort});
	};

	return (
		<>
			<div className={styles.title}>
				<Htag tag='h1'>{pageTitle}</Htag>
				{sortedProducts && <Tag size='m' color='grey' aria-label={sortedProducts.length + 'элементов'}>{sortedProducts.length}</Tag>}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div>
				{sortedProducts && sortedProducts.length > 0
					? (<>
						{sortedProducts.map(product => (
							<Product layout product={product} key={product._id}/>
						))}
					</>)
					: (<p>Продукты не найдены.</p>)
				}
			</div>
		</>
	);
}
