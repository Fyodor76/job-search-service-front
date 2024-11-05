// app/blog/[slug]/page.tsx

import CustomLink from "./Link";

// Определяем тип данных поста
type Post = {
    id: string;
    title: string;
    body: string;
  };
  
  // Функция для запроса данных поста по slug с типизацией возвращаемых данных
  async function fetchPostData(slug: string): Promise<Post> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
    console.log(response, 'response')
    if (!response.ok) {
      throw new Error('Post not found');
    }   
    return response.json();
  }
  
  // Тип для параметров компонента BlogPostPage
  type BlogPostPageProps = {
    params: {
      slug: string;
    };
  };
  
  export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = params;
  
    // Получаем данные поста с помощью запроса и типизируем их как Post
    const post: Post = await fetchPostData(slug);
  
    return (
      <article>
        <h1>{post.title}</h1>
        <p>Author: {post.body}</p>
        <CustomLink/>
      </article>
    );
  }
  