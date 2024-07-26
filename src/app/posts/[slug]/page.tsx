// src/app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '../../lib/posts';

interface Post {
  title: string;
  date: string;
  content: string;
  image?: string;
  tags?: string[];  // Added tags field
}

export async function generateStaticParams() {
  const posts = getAllPosts(['slug']);
  return posts.map(post => ({ slug: post.slug }));
}

interface Props {
  params: {
    slug: string;
  };
}

export default async function Post({ params }: Props) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'content', 'image', 'tags']);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8">{post.title}</h1>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto mb-4"
        />
      )}
      <p className="text-gray-600">{post.date}</p>
      {post.tags && (
        <div className="mt-2">
          {post.tags.map(tag => (
            <span key={tag} className="inline-block bg-gray-200 text-gray-800 text-sm rounded-full px-3 py-1 mr-2">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
