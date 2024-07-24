import Image from "next/image";
import Link from "next/link";


//components
import useComponents from "@/share/components";

export default function BlogDetail(props: any) {
  const { Typography, Button } = useComponents();
  const { blog } = props;

  return (
    <div className="min-screen-emma bg-primary space-y-4">
      <article className="px-8 max-w-[1280px] mx-auto">
        <section className="flex flex-wrap items-center gap-y-8 lg:gap-y-0 lg:gap-x-24 justify-center">
          <div className="space-y-6">
            <Typography variant="h1" className="text-yellow-400 mb-8 text-5xl">
              {blog.title}
            </Typography>
            <Typography variant="h4" className="text-white text-2xl">
              {blog.description}
            </Typography>
            <div className="text-white text-xl" dangerouslySetInnerHTML={{__html: blog.content}}/>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          </div>
        </section>
      </article>
    </div>
  );
}
