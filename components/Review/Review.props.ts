import React from 'react';
import {Review} from '@/interfaces/product.interface';

export interface ReviewProps extends React.ComponentProps<'div'> {
	review: Review;
}
