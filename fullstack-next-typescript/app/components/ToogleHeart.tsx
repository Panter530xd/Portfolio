import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface Props {
  postId: string;
  id: string;
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

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const response = await axios.get(
          `/api/posts/getLike?postId=${postId}&userEmail=${userEmail}`
        );
        setIsLiked(response.data.isLiked);
        setCount(response.data.count);
        setLikedPosts(response.data.likedPosts);
      } catch (error) {
        console.log(error);
      }
    };

    if (userEmail) {
      fetchLike();
    }
  }, [postId, userEmail]);

  const { mutate } = useMutation(
    async (data: { postId: string; id: string }) => {
      return await axios.post("/api/posts/addLike", { data });
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

  const handleHeartClick = async () => {
    if (userLikedPosts.includes(postId)) {
      if (isLiked) {
        toast.error("You can't unlike a post that you've already liked", {
          id: commentToastId,
        });
      } else {
        // Unlike the post
        try {
          await axios.delete(`/api/posts/removeLike?postId=${postId}`);
          setIsLiked(false);
          setCount(count - 1);
          setLikedPosts(likedPosts.filter((id) => id !== postId));
          setUserLikedPosts(userLikedPosts.filter((id) => id !== postId));
          toast.error("Like removed", { id: commentToastId });
        } catch (error) {
          console.log(error);
        }
      }
      return;
    }

    setCount(count + 1);
    setIsLiked(true);

    if (status === "authenticated") {
      mutate({ postId, id });
    } else {
      toast.error("Please login to like the post", { id: commentToastId });
    }

    setLikedPosts([...likedPosts, postId]);
    setUserLikedPosts([...userLikedPosts, postId]);
    toast.success("Like added", { id: commentToastId });
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
