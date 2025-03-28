import {CoursePageComponentProps} from '@/page-components/CoursePageComponent/CoursePageComponent.props';
import {HhData, Htag, Tag} from '@/components';
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
					<Tag size='m' color='red'>hh.com</Tag>
				</div>
				{firstCategory === TopLevelCategory.Courses && <HhData {...page.hh} />}
			</div>
	);
};
