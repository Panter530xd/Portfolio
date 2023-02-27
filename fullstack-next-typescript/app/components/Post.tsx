"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
}

export default function Post({ avatar, name, postTitle, id, comments }: Props) {
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
      </div>
    </motion.div>
  );
}
