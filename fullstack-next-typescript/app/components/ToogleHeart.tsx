import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface Props {
  postId: string;
  id: string;
  initialIsLiked: boolean;
  initialCount: number;
}

export default function Heart({ postId, id, initialCount }: Props) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(initialCount);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [userLikedPosts, setUserLikedPosts] = useState<string[]>([]);
  const queryClient = useQueryClient();
  let commentToastId: string;
  const { status, data } = useSession();
  const userEmail = data?.user?.email;

  const { mutate } = useMutation(
    async (data: { postId: string; id: string }) => {
      return await axios.post("/api/likes", { data });
    },
    {
      onSuccess: (data) => {
        console.log("data", data);
        setIsLiked(true);
        setCount(count + 1);
        setUserLikedPosts([...userLikedPosts, postId]);
        toast.success("Like added", { id: commentToastId });
      },
      onError: (error) => {
        console.log(error);
        setIsLiked(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
      },
    }
  );

  const { mutate: removeMutate } = useMutation(
    async (data: { postId: string; id: string }) => {
      return await axios.post("/api/likes", { data });
    },
    {
      onSuccess: (data) => {
        console.log("data", data);
        setIsLiked(false);
        setCount(count - 1);
        setLikedPosts(likedPosts.filter((id) => id !== postId));
        setUserLikedPosts(userLikedPosts.filter((id) => id !== postId));
        toast.error("Like removed", { id: commentToastId });
      },
      onError: (error) => {
        console.log(error);
        setIsLiked(true);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
      },
    }
  );

  const handleHeartClick = async () => {
    if (!userEmail) {
      toast.error("Please login to like the post", { id: commentToastId });
      return;
    }

    if (likedPosts?.includes(postId)) {
      // Remove the like
      try {
        await removeMutate({ postId, id });
        setIsLiked(false);
        setCount(count - 1);
        setLikedPosts(likedPosts.filter((id) => id !== postId));
        setUserLikedPosts(userLikedPosts.filter((id) => id !== postId)); // <--- Update state here
        toast.error("Like removed", { id: commentToastId });
      } catch (error) {
        console.log(error);
      }
    } else {
      // Add the like
      if (userLikedPosts.includes(postId)) {
        // User already liked the post
        toast.error("You have already liked this post", { id: commentToastId });
      } else {
        try {
          await mutate({ postId, id });
          setIsLiked(true);
          setCount(count + 1);
          setUserLikedPosts([...userLikedPosts, postId]);
          toast.success("Like added", { id: commentToastId });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="flex">
      {isLiked ? (
        <button onClick={handleHeartClick}>
          <FaHeart className="w-6 h-6 text-red-500 cursor-pointer" />
        </button>
      ) : (
        <button onClick={handleHeartClick}>
          <FaHeart className="w-6 h-6 text-gray-500 cursor-pointer" />
        </button>
      )}
      <span className="ml-1">{count}</span>
    </div>
  );
}
