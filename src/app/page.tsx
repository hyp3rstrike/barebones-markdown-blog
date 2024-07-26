// src/app/page.tsx
import Link from 'next/link';
import { getAllPosts } from './lib/posts';

interface Post {
  title: string;
  date: string;
  slug: string;
}

interface Props {
  allPosts: Post[];
}

export default async function Index() {
  const allPosts: Post[] = getAllPosts(['title', 'date', 'slug']);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8">Your Blog Name</h1>
      <ul>
        {allPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} legacyBehavior>
              <a className="text-xl text-blue-500">{post.title}</a>
            </Link>
            <p className="text-gray-600">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
