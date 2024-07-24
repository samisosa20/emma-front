import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { customConfigHeader } from "@/share/helpers";

import { BlogUseCase } from "@@/application/blog.use-case";
import { BlogApiAdapter } from "@@/infrastructure/blog-api.adapter";

export default function useBlogs() {
  const router = useRouter();
  const { slug } = useParams();

  const { isLoading, data, isError } = useQuery({
    queryKey: ["blogs", slug],
    queryFn: async () => {
      const { getBlogDetail } = new BlogUseCase(
        new BlogApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
          customConfig: customConfigHeader(),
        })
      );
      const slugValue = Array.isArray(slug) ? slug[0] : slug;
      const result = await getBlogDetail(slugValue);

      return result;
    },
  });

  useEffect(() => {
    if (isError) router.push("/");
  }, [isError]);

  return {
    isLoading,
    data,
  };
}
