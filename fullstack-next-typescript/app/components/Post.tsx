"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ToogleHeart from "./ToogleHeart";

interface Comment {
  createdAt: string;
  id: string;
  postId: string;
  userId: string;
}

interface Props {
  name: string;
  avatar: string;
  postTitle: string;
  comments?: Comment[];
  id: string;
  postId: string;
  hearts: {
    postId: string;
    id: string;
    userId: string;
  }[];
}

export default function Post({
  avatar,
  name,
  postTitle,
  id,
  comments,
  postId,
  hearts,
}: Props) {
  const initialIsLiked = hearts?.length > 0;
  const initialCount = hearts?.length;
  console.log(hearts);
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      className="bg-white my-8 p-8 rounded-lg "
    >
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8 ">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link
          href={{
            pathname: `/post/${id}`,
          }}
        >
          <p className=" text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
        </Link>
        <ToogleHeart
          postId={postId}
          initialIsLiked={initialIsLiked}
          initialCount={initialCount}
          id={id}
        />
      </div>
    </motion.div>
  );
}
