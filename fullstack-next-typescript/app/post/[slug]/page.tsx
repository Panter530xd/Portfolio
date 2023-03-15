"use client";
import Post from "@/app/components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostType } from "@/app/type/Post";
import AddComment from "@/app/components/AddComment";
import { motion } from "framer-motion";
import Image from "next/image";

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

type URL = {
  params: {
    slug: string;
  };
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ["detail-post"],
  });
  if (isLoading) return "Loading...";
  return (
    <div>
      <Post
        name={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        id={data?.id}
        comments={data.comments}
        postId={data.id}
        hearts={data.hearts}
      />
      <AddComment id={data?.id} />
      {data?.comments?.map((comment: PostType) => (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ ease: "easeOut" }}
          className="my-6 bg-white p-8 rounded-md"
          key={comment.id}
        >
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment?.createdAt}</h2>
          </div>
          <div className="py-4">{comment.title}</div>
        </motion.div>
      ))}
    </div>
  );
}
