import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {MenuItem} from '@/interfaces/menu.interface';
import {TopLevelCategory} from '@/interfaces/page.interface';

export interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
}
