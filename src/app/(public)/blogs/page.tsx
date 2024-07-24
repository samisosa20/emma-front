"use client";
//components
import Blogs from "./ui/view/Blogs";
import useBlogs from "./ui/model/blogs.models";

import useComponents from "@/share/components";

export default function Page() {
  const {isLoading,
    data,
    truncateText, } = useBlogs();

    const { Loading } = useComponents();

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <Blogs blogs={data} truncateText={truncateText} />
  );
}
