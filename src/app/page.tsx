// src/app/page.tsx
import Link from 'next/link';
import { getAllPosts } from './lib/posts';

interface Post {
  title: string;
  date: string;
  slug: string;
  image?: string;
  tags?: string[];  // Added tags field
}

interface Props {
  allPosts: Post[];
}

export default async function Index() {
  const allPosts: Post[] = getAllPosts(['title', 'date', 'slug', 'image', 'tags']);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8">Blog</h1>
      <ul>
        {allPosts.map((post) => (
          <li key={post.slug} className="mb-8">
            <Link href={`/posts/${post.slug}`} legacyBehavior>
              <a>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto mb-4"
                  />
                )}
                <h2 className="text-xl text-blue-500">{post.title}</h2>
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
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
