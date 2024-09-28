import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <div>
        <Link href="/test">Перейти на тестовую страницу</Link>
      </div> */}
      <div>
        <Link href="/resume-generator">Перейти на страницу генерации резюме</Link>
      </div>
      {/* <div>
        <Link href="/user-page">Перейти на страницу лэндинга</Link>
      </div>
      <div>
        <Link href="/draggable-page">Перейти на страницу, где можно перетаскивать элементы</Link>
      </div> */}
    </main>
  );
}
