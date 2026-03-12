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

      // 从内容中提取标题（第一个 # 标题），去掉所有 emoji
      const titleMatch = matterResult.content.match(/^#\s+(.+)$/m);
      const extractedTitle = titleMatch 
        ? titleMatch[1].trim().replace(/[^\u0000-\u007F\u4E00-\u9FA5]/gu, '').trim() 
        : 'Untitled';

      // 提取年份 - 处理 date 可能是 Date 对象或字符串的情况
      let date = matterResult.data.date;
      if (date instanceof Date) {
        date = date.toISOString().split('T')[0];
      } else if (typeof date !== 'string' || !date) {
        date = new Date().toISOString().split('T')[0];
      }
      const year = parseInt(date.split('-')[0], 10);

      // 生成摘要：优先使用 description，其次是 excerpt，最后从内容提取
      const excerpt = matterResult.data.description || 
        matterResult.data.excerpt || 
        matterResult.content
          .replace(/^#\s+.+$/gm, '') // 去掉标题
          .replace(/[\n\r]+/g, ' ') // 换行变空格
          .replace(/\s+/g, ' ') // 多个空格合并
          .trim()
          .slice(0, 80) + '...';

      // 处理标题：优先使用 frontmatter 的 title，其次从内容提取，都去掉所有 emoji
      const title = (matterResult.data.title || extractedTitle)
        .replace(/[^\u0000-\u007F\u4E00-\u9FA5]/gu, '')
        .trim();

      return {
        id,
        slug,
        title,
        excerpt,
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

    // 从内容中提取标题（第一个 # 标题）
    const titleMatch = matterResult.content.match(/^#\s+(.+)$/m);
    const extractedTitle = titleMatch ? titleMatch[1].trim() : 'Untitled';

    // 转换 Markdown 为 HTML
    const processedContent = await remark()
      .use(remarkGfm) // 支持 GitHub Flavored Markdown
      .use(html, { sanitize: false }) // 允许 HTML 标签
      .process(matterResult.content);
    
    let contentHtml = processedContent.toString();

    // 给表格添加包裹层以实现横向滚动
    contentHtml = contentHtml.replace(
      /<table>/g,
      '<div class="table-wrapper"><table>'
    );
    contentHtml = contentHtml.replace(
      /<\/table>/g,
      '</table></div>'
    );

    // 处理 date 可能是 Date 对象或字符串的情况
    let date = matterResult.data.date;
    if (date instanceof Date) {
      date = date.toISOString().split('T')[0];
    } else if (typeof date !== 'string' || !date) {
      date = new Date().toISOString().split('T')[0];
    }
    const year = parseInt(date.split('-')[0], 10);

    // 生成摘要
    const excerpt = matterResult.data.excerpt || matterResult.content
      .replace(/^#\s+.+$/gm, '')
      .replace(/[\n\r]+/g, ' ')
      .trim()
      .slice(0, 200) + '...';

    return {
      id: slug,
      slug,
      title: matterResult.data.title || extractedTitle,
      excerpt,
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
