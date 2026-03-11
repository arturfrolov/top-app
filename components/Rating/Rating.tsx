'use client';

import {RatingProps} from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import {useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef} from 'react';
import StarIcon from './star.svg';

export const Rating = forwardRef(({isEditable = false, rating, setRating, tabIndex, error, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>) => {

	const [hoverRating, setHoverRating] = useState<number>(rating);
	const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>(new Array(5).fill(null));

	useEffect(() => {
		setHoverRating(rating);
		ratingArrayRef.current.length = 5;
	}, [rating]);

	const computeFocus = (i: number): number => {
		if (!isEditable) return -1;
		if (!rating && i === 0) return tabIndex ?? 0;
		if (rating === i + 1) return tabIndex ?? 0;
		return -1;
	};

	const changeDisplay = (newRating: number) => {
		if (!isEditable) return;
		setHoverRating(newRating);
	};

	const onClick = (newRating: number) => {
		if (!isEditable || !setRating) return;
		setRating(newRating);
	};

	const handleKey = (e: KeyboardEvent) => {
		if (!isEditable || !setRating) return;

		if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
			if (!rating) {
				setRating(1);
			} else {
				e.preventDefault();
				setRating(rating < 5 ? rating + 1 : 5);
			}
			ratingArrayRef.current[rating]?.focus();
		}

		if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
			e.preventDefault();
			setRating(rating > 1 ? rating - 1 : 1);
			ratingArrayRef.current[rating - 2]?.focus();
		}
	};

	return (
		<div {...props} ref={ref} className={cn(styles.ratingWrapper, {
			[styles.error]: error,
		})}>
			{Array.from({length: 5}, (_, index) => (
				<span
					key={index}
					className={cn(styles.star, {
						[styles.filled]: index < hoverRating,
						[styles.editable]: isEditable,
						[styles.firstStar]: index === 0,
					})}
					onMouseEnter={() => changeDisplay(index + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => onClick(index + 1)}
					tabIndex={computeFocus(index)}
					onKeyDown={handleKey}
					ref={r => { ratingArrayRef.current[index] = r; }}
					role={isEditable ? 'slider' : ''}
					aria-invalid={!!error}
					aria-valuenow={rating}
					aria-valuemax={5}
					aria-label={isEditable ? 'Укажите рейтинг' : `рейтинг ${rating}`}
					aria-valuemin={1}
				>
					<StarIcon/>
				</span>
			))}
			{error && <span className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
});

Rating.displayName = 'Rating';
