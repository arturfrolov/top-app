import {TopLevelCategory, TopPageModel} from '@/interfaces/page.interface';
import {ProductModel} from '@/interfaces/product.interface';

export interface CoursePageComponentProps {
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
}
