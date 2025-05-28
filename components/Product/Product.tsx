'use client';

import {ProductProps} from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import {Button, Card, Divider, Rating, Review, ReviewForm, Tag} from '@/components';
import {declOfNum, priceUa} from '@/helpers/helpers';
import Image from 'next/image';
import {ForwardedRef, forwardRef, Fragment, useRef, useState} from 'react';
import {motion} from 'framer-motion';

const ProductInner = forwardRef(function Product({product, className, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>) {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);

	const variants = {
		visible: {
			opacity: 1,
			height: 'auto',
			overflow: 'visible',
		},
		hidden: {
			opacity: 0,
			height: 0,
			overflow: 'hidden',
		}
	};

	const scrollToReview = () => {
		setIsReviewOpened(true);

		if (reviewRef.current) {
			reviewRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});

			reviewRef.current.focus();
		}
	};

	return (
		<div className={className} {...props} ref={ref}>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image
						src={product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					{priceUa(product.price)}
					{product.oldPrice && <Tag className={styles.discount} color='green'>{priceUa(product.price - product.oldPrice)}</Tag>}
				</div>
				<div className={styles.credit}>
					{priceUa(product.credit)}/<span>мес</span>
				</div>
				<div className={styles.rating}>
					<Rating rating={product.reviewAvg ?? product.initialRating}/>
				</div>
				<div className={styles.tags}>
					{product.categories.map((category) => (
						<Tag className={styles.category} key={category} color='ghost'>{category}</Tag>
					))}
				</div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>в кредит</div>
				<div className={styles.rateTitle}>
					<a href="#ref" onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a>
				</div>
				<Divider className={styles.hr}/>
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map((characteristic) => (
						<div className={styles.characteristic} key={characteristic.name}>
							<span className={styles.characteristicName}>{characteristic.name}</span>
							<span className={styles.characteristicDots}></span>
							<span className={styles.characteristicValue}>{characteristic.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages &&
						<div className={styles.advatntages}>
							<div className={styles.advTitle}>Преимущества</div>
							<div>{product.advantages}</div>
						</div>
					}
					{product.disadvantages &&
						<div className={styles.disadvantages}>
							<div className={styles.advTitle}>Недостатки</div>
							<div>{product.disadvantages}</div>
						</div>
					}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)}/>
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						appearance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<motion.div animate={isReviewOpened ? 'visible' : 'hidden'} variants={variants} initial='hidden'>
				<Card color='blue' className={styles.reviews} ref={reviewRef} tabIndex={isReviewOpened ? 0 : -1}>
					{product.reviews.length > 0 && product.reviews.map((review) => (
						<Fragment key={review._id}>
							<Review review={review}/>
							<Divider />
						</Fragment>
					))}
					<ReviewForm productId={product._id} isOpened={isReviewOpened}/>
				</Card>
			</motion.div>
		</div>
	);
});

export const Product = motion.create(ProductInner);
