
export type PostsType = {
  hearts: { postId: string; id: string; userId: string }[]
  title: string
  id: string
  createdAt?: string
  comments?: {
    createdAt: string
    id: string
    postId: string
    userId: string
  }[]
  user: {
    name: string
    image: string
  }
}
