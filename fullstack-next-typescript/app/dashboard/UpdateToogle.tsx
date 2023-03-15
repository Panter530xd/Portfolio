"use client";

import { useState } from "react";

type ToggleProps = {
  updatePost: (newTitle: string) => void;
  setToggle: (toggle: boolean) => void;
  title: string;
};

export default function Toggle({ updatePost, setToggle, title }: ToggleProps) {
  const [newTitle, setNewTitle] = useState(title);

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleUpdatePost = () => {
    updatePost(newTitle); // WHAT IF IT RETURNS AN ERROR
    setToggle(false);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setToggle(false);
      }}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 "
    >
      <div
        onClick={handleFormClick}
        className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6"
      >
        <h2 className="text-xl">
          Are you sure you want to update this post?😃
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            className="py-2"
            type="text"
            id="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>

        <button
          onClick={handleUpdatePost}
          className="bg-teal-600 text-sm text-white py-2 px-4 rounded-md"
        >
          Update Post
        </button>
      </div>
    </div>
  );
}
