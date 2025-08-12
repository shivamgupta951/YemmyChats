// src/components/posts/PostSkeleton.jsx
import React from "react";

const PostSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto bg-base-100 border rounded-xl shadow p-4 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-full bg-base-200 w-11 h-11" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-base-200 rounded w-1/3" />
          <div className="h-3 bg-base-200 rounded w-1/4" />
        </div>
      </div>

      <div className="bg-base-200 h-64 rounded mb-4" />

      <div className="space-y-2">
        <div className="h-4 bg-base-200 rounded w-3/4" />
        <div className="h-3 bg-base-200 rounded w-2/3" />
      </div>
    </div>
  );
};

export default PostSkeleton;
