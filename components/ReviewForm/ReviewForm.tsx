'use client';

import {ReviewFormProps} from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import {Button, Input, Rating, Textarea} from '@/components';
import CloseIcon from './close.svg';
import {useForm, Controller} from 'react-hook-form';
import {IReviewForm, IReviewSentResponse} from '@/components/ReviewForm/ReviewForm.interface';
import {API} from '@/app/api';
import {useState} from 'react';

export const ReviewForm = ({ productId, isOpened, className, ...props}: ReviewFormProps) => {
	const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setIsError] = useState<string>();

	const onSubmit = async (data: IReviewForm) => {
		const payload = {...data, productId};

		try {
			const response = await fetch(API.review.createDemo, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error(response.statusText ||`Ошибка при отправке данных ${response.status}`);
			}

			const data = (await response.json()) as IReviewSentResponse;

			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setIsError('Что-то пошло не так');
			}

		} catch (error) {
			if(error instanceof Error) {
				setIsError(error.message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					className={styles.input}
					placeholder='Имя'
					{...register('name', {required: {value: true, message: 'Заполните имя'}})}
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
				/>
				<Input
					className={styles.input}
					placeholder='Заголовок отзыва'
					{...register('title', {required: {value: true, message: 'Заполните заголовок отзыва'}})}
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						name='rating'
						control={control}
						rules={{
							required: 'Укажите рейтинг'
						}}
						render={({field}) => (
							<Rating
								rating={field.value}
								ref={field.ref}
								isEditable={true}
								setRating={field.onChange}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<Textarea
					className={styles.description}
					placeholder='Текст отзыва'
					{...register('description', {required: {value: true, message: 'Заполните текст отзыва'}})}
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
				/>
				<div className={styles.submit}>
					<Button appearance='primary' tabIndex={isOpened ? 0 : -1}>
						Отправить
					</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccess &&
				<div className={cn(styles.panel, styles.success)}>
					<div className={styles.successTitle}>
						Ваш отзыв отправлен
					</div>
					<div>
						Спасибо, ваш отзыв будет опубликован после проверки.
					</div>
					<CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
				</div>
			}
			{error &&
				<div className={cn(styles.panel, styles.error)}>
					{error}
					<CloseIcon className={styles.close} onClick={() => setIsError(undefined)}/>
				</div>
			}
		</form>
	);
};

