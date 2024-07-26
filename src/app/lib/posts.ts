import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

interface PostData {
  title: string;
  date: string;
  slug: string;
  content: string;
}

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []): PostData {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processor = unified()
    .use(remarkParse)
    .use(remarkHtml);

  const htmlContent = processor.processSync(content).toString();

  const post: PostData = {
    title: data.title as string,
    date: data.date as string,
    slug: realSlug,
    content: htmlContent,
  };

  fields.forEach((field) => {
    if (field in data) {
      (post as any)[field] = data[field];
    }
  });

  return post;
}

export function getAllPosts(fields: string[] = []): PostData[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1));
  return posts;
}
