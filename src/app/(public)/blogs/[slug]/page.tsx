"use client";
//components
import BlogDetail from "./ui/view/BlogDetail";
import useBlogs from "./ui/model/blogs.models";

import useComponents from "@/share/components";

export default function Page() {
  const {isLoading,
    data, } = useBlogs();

    const { Loading } = useComponents();

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <BlogDetail blog={data} />
  );
}
