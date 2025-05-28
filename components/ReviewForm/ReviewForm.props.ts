import React from 'react';

export interface ReviewFormProps extends React.ComponentProps<'div'> {
	productId: string;
	isOpened: boolean;
}
