"use client";
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
  Comment?: Comment[];
  id: string;
}

export default function Post({ avatar, name, postTitle, id, Comment }: Props) {
  return (
    <div className=" bg-gray-200 my-8 p-8 rounded-lg w-8/12 mx-auto">
      <div className=" flex items-center gap-2">
        <Image
          src={avatar}
          alt={"avatar"}
          width={32}
          height={32}
          className=" rounded-full"
        />
        <h3 className=" font-bold text-gray-700">{name}</h3>
      </div>
      <div className=" my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 coursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className=" text-sm font-bold text-gray-700">
            {Comment?.length} Comment
          </p>
        </Link>
      </div>
    </div>
  );
}
