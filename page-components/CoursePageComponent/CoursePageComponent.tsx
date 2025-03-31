import {CoursePageComponentProps} from '@/page-components/CoursePageComponent/CoursePageComponent.props';
import {Advantages, HhData, Htag, Tag} from '@/components';
import styles from './CoursePageComponent.module.css';
import {TopLevelCategory} from '@/interfaces/page.interface';

export const CoursePageComponent = ({firstCategory, page, products}: CoursePageComponentProps) => {
	return (
			<div className={styles.wrapper}>
				<div className={styles.title}>
					<Htag tag='h1'>{page.title}</Htag>
					{products && <Tag size='m' color='grey'>{products.length}</Tag>}
					<span>Сортировка</span>
				</div>
				<div>
					{products &&
						<ul>
							{products.map(product => (
								<li key={product._id}>
									<span>{product.title}</span>
								</li>
							))}
						</ul>
					}
				</div>
				<div className={styles.hhTitle}>
					<Htag tag='h2'>Вакансии - {page.category}</Htag>
					<Tag size='m' color='red'>dou.ua</Tag>
				</div>
				{firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
				{page.advantages && page.advantages.length > 0 &&
					<>
						<Htag tag='h2'>Преимущества</Htag>
						<Advantages advantages={page.advantages} />
					</>
				}
				{page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}}/>}
				<Htag tag='h2'>Получаемые навыки</Htag>
				{page.tags.map(tag => <Tag key={tag} color='primary'>{tag}</Tag> )}
			</div>
	);
};
