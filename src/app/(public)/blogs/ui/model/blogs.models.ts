import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { customConfigHeader } from "@/share/helpers";

import { BlogUseCase } from "@@/application/blog.use-case";
import { BlogApiAdapter } from "@@/infrastructure/blog-api.adapter";

export default function useBlogs() {
  const router = useRouter();

  const { isLoading, data, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { listBlogs } = new BlogUseCase(
        new BlogApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
          customConfig: customConfigHeader(),
        })
      );

      const result = await listBlogs();

      return result;
    },
  });

  const truncateText = (text: string) => {
    if (text.length <= 150) {
      return text;
    }
    return text.substring(0, 150) + '...';
  };

  useEffect(() => {
    if (isError) router.push("/");
  }, [isError]);

  return {
    isLoading,
    data,
    truncateText,
  };
}
