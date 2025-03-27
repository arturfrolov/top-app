import {CoursePageComponentProps} from '@/page-components/CoursePageComponent/CoursePageComponent.props';

export const CoursePageComponent = ({firstCategory, page, products}: CoursePageComponentProps) => {
	return (
			<>
				{products && products.length}
				<div>
					<h1>{page.title}</h1>
					<ul>
						{products.map(product => (
							<li key={product._id}>
								<span>{product.title}</span>
							</li>
						))}
					</ul>
				</div>
			</>
	);
};
