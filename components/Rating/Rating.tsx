'use client';

import {RatingProps} from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import {JSX, useEffect, useState, KeyboardEvent} from 'react';
import StarIcon from './star.svg';

export const Rating = ({isEditable = false, rating, setRating, ...props}: RatingProps) => {

	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rating]);

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((item: JSX.Element, index: number) => {
			return (
				<span
					key={index}
					className={cn(styles.star, {
						[styles.filled]: index < currentRating,
						[styles.editable]: isEditable,
						[styles.firstStar]: index === 0,
					})}
					onMouseEnter={() => changeDisplay(index + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => onClick(index + 1)}
				>
					<StarIcon
						tabIndex={isEditable ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(e, index + 1)}
					/>
				</span>

			);
		});

		setRatingArray(updatedArray);
	};

	const changeDisplay = (newRating: number) => {
		if (!isEditable) return;

		constructRating(newRating);
	};

	const onClick = (newRating: number) => {
		if (!isEditable || !setRating) return;

		setRating(newRating);
	};

	const handleSpace = (e: KeyboardEvent<SVGElement>, newRating: number) => {
		if (e.code !== 'Space' || !setRating) return;

			setRating(newRating);
	};

	return (
		<div {...props}>
			{ratingArray.map((ratingItem: JSX.Element, index: number) => (<span key={index}>{ratingItem}</span>))}
		</div>
	);
};

