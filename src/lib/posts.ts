import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

// 文章类型定义
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  year: number;
  tags: string[];
  content: string;
  contentHtml: string;
}

// 文章目录
const postsDirectory = path.join(process.cwd(), 'content/posts');

// 获取所有文章
export function getAllPosts(): Post[] {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // 移除 .md 后缀作为 slug
      const slug = fileName.replace(/\.md$/, '');
      const id = slug;

      // 读取文件内容
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // 解析 frontmatter
      const matterResult = matter(fileContents);

      // 提取年份
      const date = matterResult.data.date || new Date().toISOString().split('T')[0];
      const year = parseInt(date.split('-')[0], 10);

      return {
        id,
        slug,
        title: matterResult.data.title || 'Untitled',
        excerpt: matterResult.data.excerpt || '',
        date,
        year,
        tags: matterResult.data.tags || [],
        content: matterResult.content,
        contentHtml: '', // 列表页不需要 HTML 内容
      };
    });

  // 按日期降序排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 根据 slug 获取单篇文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // 转换 Markdown 为 HTML
    const processedContent = await remark()
      .use(remarkGfm) // 支持 GitHub Flavored Markdown
      .use(html, { sanitize: false }) // 允许 HTML 标签
      .process(matterResult.content);
    
    const contentHtml = processedContent.toString();

    const date = matterResult.data.date || new Date().toISOString().split('T')[0];
    const year = parseInt(date.split('-')[0], 10);

    return {
      id: slug,
      slug,
      title: matterResult.data.title || 'Untitled',
      excerpt: matterResult.data.excerpt || '',
      date,
      year,
      tags: matterResult.data.tags || [],
      content: matterResult.content,
      contentHtml,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// 获取所有文章的 slug（用于生成静态路径）
export function getAllPostSlugs(): { slug: string }[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => ({
      slug: fileName.replace(/\.md$/, ''),
    }));
}
