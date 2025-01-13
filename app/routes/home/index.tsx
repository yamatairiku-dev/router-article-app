import type { Route } from "./+types/index";
import BlogCard from "~/components/BlogCard";
import { motion } from "framer-motion";
import { homeLoader } from "./loader"

export const loader = homeLoader

export default function Home({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData;
  return (
    <div className="flex-1 sm:ml-64">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h2 className="mb-6 text-3xl font-bold text-gray-800">記事一覧</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.url} article={article} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
