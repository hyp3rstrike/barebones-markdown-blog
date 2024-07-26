// src/app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '../../lib/posts';

interface PostProps {
  post: {
    title: string;
    date: string;
    content: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts(['slug']);
  return posts.map(post => ({ slug: post.slug }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'content']);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8">{post.title}</h1>
      <p className="text-gray-600">{post.date}</p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
