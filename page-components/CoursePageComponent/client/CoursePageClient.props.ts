import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {ProductModel} from '@/interfaces/product.interface';

export interface CoursePageClientProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	initialProducts: ProductModel[];
	pageTitle: string;
}
