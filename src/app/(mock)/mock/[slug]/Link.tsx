"use client"; // Указываем, что этот компонент использует клиентскую часть

import { useState } from 'react';
import Link from 'next/link';

const CustomLink = () => {
  const [pageNumber, setPageNumber] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageNumber(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Введите номер страницы"
        value={pageNumber}
        onChange={handleChange}
      />
      <Link href={`/mock/${pageNumber}`}>
        <button type="button">Перейти на страницу</button>
      </Link>
    </div>
  );
};

export default CustomLink;
