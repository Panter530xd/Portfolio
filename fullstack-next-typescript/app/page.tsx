"use client";
import { PostsType } from "./type/Postinterface";
import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};
export default function Home() {
  const { data, error, isLoading } = useQuery<PostsType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";
  console.log(data);

  return (
    <main className=" py-10">
      <AddPost />
      {data?.map((post) => {
        return (
          <Post
            key={post.id}
            name={post.user.name}
            avatar={post.user.image}
            postTitle={post.title}
            id={post.id}
            comments={post.comments}
          />
        );
      })}
    </main>
  );
}
