This project is a barebones blog system that uses [Markdown](https://www.markdownguide.org/) for content formatting, built on [NextJS](https://nextjs.org/) with [Tailwind CSS](https://tailwindcss.com/). It should be enough to get you started with whatever you want to make.

It has basic styling applied, allowing you to write your own HTML layouts and styles without having to remove a bunch of crap you don't want (a problem I found with a lot of starter templates).

## Getting Started

### Requirements

* [NodeJS](https://nodejs.org/)
* [Git](https://git-scm.com/)

### Starting the project

To create your own blog using this project, follow the steps below.

1. Click the **Use This Template** button in the top-right corner of the repository.
2. Click **Create a new repository** option.
3. In the `Repository name` field, enter `<your github username>.github.io`.
4. (Optional) Enter a description and set the repo to **Public** or **Private**[^*], then click **Create Repository**.

[^*]: If you are using a free GitHub account, selecting Private repository will prevent the CICD pipeline from executing. If you'd like to have a private repo but a public site, you'll need a GitHub Pro subscription.

## Development

You can see your code changes in real-time by running a local development server on your machine.

1. Open the project root directory in your preferred terminal client.
2. Type `npm run dev` into the terminal window.
3. Open [https://localhost:30000](https://localhost:3000) to see your result.

## Changing the main page

You can change the main page code in `src/app/page.tsx`.

```tsx
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
```

If you want to change the code for the post pages, you can edit the code in `src/app/posts/[slug]/page.tsx`.

```tsx
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
```

## Building your site

This repo already includes a GitHub Actions workflow that will build and deploy to GitHub Pages whenever any changes are merged to `main` branch. If you'd like to implement your own workflow, simply delete the `.github` directory.

If you'd like to generate a static version of the site when you run `npm run build`, change the `next.config.mjs` file to the following:

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export'
};

export default nextConfig;
```

## Learn More about NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Next.js GitHub repository](https://github.com/vercel/next.js/)
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.