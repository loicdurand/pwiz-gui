export interface Post {
  id: string,
  title: string,
  content: string[],
  content_type: string,
  tags: string[],
  created_at: number, // timestamp
  last_modified_at: number // timestamp
}