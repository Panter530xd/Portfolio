"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../type/AuthPosts";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/authpost");
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });

  if (isLoading) return <h1>Posts are Loading....</h1>;

  return (
    <div className="my-8 ">
      {data?.posts?.map((post) => (
        <div
          key={post.id}
          className=" bg-white rounded-lg grid grid-cols-2 gap-10 items-center mb-10"
        >
          <DeletePost
            id={post.id}
            avatar={data.image}
            name={data.name}
            title={post.title}
            comments={post.comments}
          />
          <EditPost
            id={post.id}
            avatar={data.image}
            name={data.name}
            title={post.title}
          />
        </div>
      ))}
    </div>
  );
}
