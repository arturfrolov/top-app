'use client';

import {useEffect, useState} from 'react';


export const useScrollY = (): number => {

	const [scrollY, setScrollY] = useState<number>(0);

	const handleScroll = () => {
		setScrollY(window.scrollY || 0);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, {passive: true});
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return scrollY;
};
