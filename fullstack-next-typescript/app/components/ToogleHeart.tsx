import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface Props {
  postId: string;
  initialIsLiked: boolean;
  initialCount: number;
  id: string;
}

export default function Heart({
  postId,
  initialCount,
  initialIsLiked,
  id,
}: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  let commentToastId: string;
  const { mutate } = useMutation(
    async (data: { postId: string; id: string }) => {
      return await axios.post("/api/likes", { postId });
    },
    {
      onSuccess: (data) => {
        data.status === 200
          ? toast.error("Like removed", { id: commentToastId })
          : toast.success("Like added", { id: commentToastId });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message);
        }
      },
    }
  );

  const handleHeartClick = async () => {
    if (!session) {
      toast.error("Please login to like the post", { id: commentToastId });
      return;
    }
    mutate({ postId, id });
  };

  return (
    <div className="flex">
      <button onClick={handleHeartClick}>
        <FaHeart
          className={`w-6 h-6 cursor-pointer ${
            initialIsLiked ? "text-red-500" : "text-gray-500"
          }`}
        />
      </button>
      <span className="ml-1">{initialCount}</span>
    </div>
  );
}
