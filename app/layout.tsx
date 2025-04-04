import {Metadata} from 'next';
import React from 'react';
import {Noto_Sans} from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';
import {Footer, Header, Sidebar} from '@/layouts';
import Menu from '@/components/Menu/Menu';
import {TopLevelCategory} from '@/interfaces/page.interface';
import {getMenu} from '@/api/menu';


const notoSans = Noto_Sans({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
});


export const metadata: Metadata = {
  title: 'Top App project',
  description: 'Generated by create next app',
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

  const firstCategory = TopLevelCategory.Courses;
  const menu = await getMenu(firstCategory);

  return (
    <html lang="en">
      <body className={`${notoSans.variable}`}>
        <div className={styles.wrapper}>
          <Header className={styles.header}/>
          <Sidebar className={styles.sidebar}>
            <Menu menu={menu} firstCategory={firstCategory} />
          </Sidebar>
          <main className={styles.main}>
            {children}
          </main>
          <Footer className={styles.footer}/>
        </div>
      </body>
    </html>
  );
}
