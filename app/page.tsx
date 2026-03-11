import Image from 'next/image';
import styles from './Home.module.css';
import {Htag, P} from '@/components';
import {Metadata} from 'next';
import {getProduct} from '@/api/product';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Онлайн‑курсы | Главная',
  description: 'Учитесь у практикующих преподавателей и улучшайте навыки уже сегодня',
};

function placeholderImg(id: string) {
  return `https://picsum.photos/seed/${id}/600/400`;
}


const FEATURED_CATEGORY = {
  name: 'Графический дизайн',
  route: 'courses',
  alias: 'graphic-design',
} as const;

export default async function Home() {

  const courses = await getProduct(FEATURED_CATEGORY.name);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Htag tag='h1'>Онлайн‑курсы</Htag>
          <P size='l' className={styles.subtitle}>
            Учитесь у практикующих преподавателей и улучшайте свои навыки уже сегодня.
          </P>
        </div>
      </section>

      <section className={styles.features}>
        <Htag tag='h2'>Почему мы?</Htag>
        <ul className={styles.featureGrid}>
          <li>
            <span className={styles.featureIcon}>🎓</span>
            <P>
              Только практические задания
            </P>
          </li>
          <li>
            <span className={styles.featureIcon}>💬</span>
            <P>
              Обратная связь от менторов
            </P>
          </li>
          <li>
            <span className={styles.featureIcon}>🗓️</span>
            <P>
              Гибкий график обучения
            </P>
          </li>
          <li>
            <span className={styles.featureIcon}>📜</span>
            <P>
              Сертификат после окончания
            </P>
          </li>
        </ul>
      </section>

      <section className={styles.courses}>
        <Htag tag='h2'>Популярные курсы</Htag>
        <div className={styles.courseGrid}>
          {courses.map((c, index) => (
            <article key={c._id} className={styles.courseCard}>
              <Image
                src={placeholderImg(c._id)}
                alt={c.title}
                width={360}
                height={240}
                className={styles.courseImage}
                priority={index === 0}
              />
              <div className={styles.courseBody}>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
              </div>
              <div className={styles.courseFooter}>
                <span className={styles.price}>{c.price} ₴</span>

                <Link href={`/${FEATURED_CATEGORY.route}/${FEATURED_CATEGORY.alias}`} className={styles.enrollButton}>
                  Прочитать отзывы
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2>Отзывы студентов</h2>
        <div className={styles.testimonialList}>
          <blockquote>
            «Занятия построены логично, много практики. Уже через месяц я оформлял первые заказы на фрилансе!»
            <footer>— Анна, UI‑дизайнер</footer>
          </blockquote>
          <blockquote>
            «Курс Retouch Master помог улучшить портфолио и получить работу в студии. Спасибо команде!»
            <footer>— Олег, фотограф‑ретушёр</footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
