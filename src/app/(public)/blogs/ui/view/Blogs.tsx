import Image from "next/image";
import Link from "next/link";

//components
import useComponents from "@/share/components";

export default function Blogs(props: any) {
  const { Typography, Button } = useComponents();
  const { blogs, truncateText } = props;

  return (
    <div className="min-screen-emma bg-primary space-y-4">
      <article className="px-8 max-w-[1280px] mx-auto">
        <section className="flex flex-wrap items-center gap-y-8 lg:gap-y-0 lg:gap-x-24 justify-center">
          <div className="">
            <Typography variant="h1" className="text-white mb-8 text-5xl">
              Bienvenidos al Blog de{" "}
              <span className="text-yellow-400">Emma</span>.
            </Typography>
            <Typography variant="h4" className="text-white">
              En nuestro blog encontrarás todo lo que necesitas saber para sacar
              el máximo provecho. Aquí compartimos guías detalladas, tutoriales
              paso a paso y consejos prácticos para ayudarte a dominar cada
              funcionalidad de nuestra aplicación.
            </Typography>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {blogs.map((blog: any) => (
              <Link href={`/blogs/${blog.slug}`} className="p-6">
                <div className="bg-gray-100 w-full h-[180px] animate-pulse mb-4"></div>
                <Typography
                  variant="h2"
                  className="text-2xl font-bold mb-2 text-yellow-400"
                >
                  {blog.title}
                </Typography>
                <Typography className="text-white mb-4">
                  {truncateText(blog.description)}
                </Typography>
              </Link>
            ))}
          </div>
          {blogs.length === 0 && (
            <Typography variant="h4" className="text-white mt-12 text-center">
              Aun no tenemos articulos disponibles.
            </Typography>
          )}
        </section>
      </article>
    </div>
  );
}
