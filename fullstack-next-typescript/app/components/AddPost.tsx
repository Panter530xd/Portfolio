"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [isDisable, setisDisable] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string;

  const { mutate } = useMutation(
    async (title: string) =>
      await axios.post("/api/posts/addPost", {
        title,
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
        setisDisable(false);
      },
      onSuccess: (data) => {
        toast.success("Post has been made 🔥", { id: toastPostID });
        queryClient.invalidateQueries(["posts"]);
        setTitle("");
        setisDisable(false);
      },
    }
  );
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Creating your post", { id: toastPostID });
    setisDisable(true);
    mutate(title);
  };
  return (
    <form
      onSubmit={submitPost}
      className="  bg-gray-300 my-8 p-7 rounded-lg w-8/12 mx-auto"
    >
      <div className=" flex flex-col py-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my2 bg-gray-200"
        ></textarea>
      </div>
      <div className=" flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? " text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisable}
          className="text-sm bg-teal-500 text-white px-6 py-2 rounded-md disabled:opacity-25"
          type="submit"
        >
          Create Post
        </button>
      </div>
    </form>
  );
}
