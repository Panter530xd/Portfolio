"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditPost from "./EditPost";
import { AuthPosts } from "../type/AuthPosts";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPost");
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });

  if (isLoading) return <h1>Posts are Loading....</h1>;
  console.log(data);
  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPost
          key={post.id}
          id={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
