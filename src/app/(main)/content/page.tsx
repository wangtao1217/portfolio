import { getAllPosts } from '@/lib/posts';
import { ContentClient } from './content-client';

export default function ContentPage() {
  const posts = getAllPosts();

  return <ContentClient posts={posts} />;
}
