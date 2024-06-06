import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 data-glitch="Browse our blog connection">
        Browse our blog connection
      </h1>
      <Link href="/blog">Explore Blogs</Link>
    </div>
  );
}
