import {ProductProps} from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import {Button, Card, Divider, Rating, Tag} from '@/components';
import {priceUa} from '@/helpers/helpers';

export const Product = ({product, className, ...props}: ProductProps) => {
	return (
		<Card className={styles.product}>
			<div className={styles.logo}>
				<img src={product.image} alt={product.title}/>
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
			<div className={styles.rateTitle}>{product.reviewCount} отзывов</div>
			<Divider className={styles.hr}/>
			<div className={styles.description}>{product.description}</div>
			<div className={styles.features}>Фичи</div>
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
			<Divider className={styles.hr}/>
			<div className={styles.actions}>
				<Button appearance='primary'>Узнать подробнее</Button>
				<Button appearance='ghost' arrow='right'>Читать отзывы</Button>
			</div>
		</Card>
	);
};

