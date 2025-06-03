'use client';

import {SearchProps} from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import {Button, Input} from '@/components';
import React, {useState} from 'react';
import SearchIcon from './search.svg';



export const Search = ({className, ...props}: SearchProps) => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearch = () => {
		if (search.trim()) {
			router.push(`/search?q=${encodeURIComponent(search)}`);
			setSearch('');
		} else {
			setSearch('');
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			goToSearch();
		}
	};

	return (
		<form className={cn(className, styles.search)} {...props} role='search' onSubmit={(e) => e.preventDefault()}>
			<Input
				className={styles.input}
				placeholder='Поиск...'
				value={search}
				onChange={e => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance='primary'
				className={styles.button}
				onClick={goToSearch}
				aria-label="Искать"
			>
				<SearchIcon />
			</Button>
		</form>
	);
};

