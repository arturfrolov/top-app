import React from 'react';
import {FieldError} from 'react-hook-form';

export interface TextareaProps extends React.ComponentProps<'textarea'> {
	error?: FieldError;
}
