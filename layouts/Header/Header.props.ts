import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {TopLevelCategory} from '@/interfaces/page.interface';
import {MenuItem} from '@/interfaces/menu.interface';

export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	allMenus: Record<TopLevelCategory, MenuItem[]>;
	firstCategory: TopLevelCategory;
}
