import { Article, type ArticleJson } from '~/domain/Article'
import { useEffect, useRef } from 'react'
import { useFetcher, useLoaderData } from 'react-router'
import { SearchIcon } from 'lucide-react'
import BlogCardWithFavorite from '~/components/BlogCardWithFavorite'
import { motion } from 'framer-motion'
import { searchLoader } from './loader'
import { searchAction } from './action'

export const loader = searchLoader
export const action = searchAction

export default function Search() {
  const formRef = useRef<HTMLFormElement>(null)
  const fetcher = useFetcher<{ articles: Article[] }>()
  const loader = useLoaderData<{ articles: Article[] }>()
  const articles = fetcher.data?.articles || loader.articles
  useEffect(() => {
    if (fetcher.state === 'idle') {
      formRef.current?.reset()
    }
  }, [fetcher])

  return (
    <div className="flex sm:ml-64">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h2 className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-200">
          記事検索
        </h2>
        <fetcher.Form
          ref={formRef}
          action="/search"
          method="post"
          className="mb-8 flex"
        >
          <input
            type="text"
            name="keywords"
            placeholder="キーワードを入力..."
            className="flex-grow rounded-l-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            name="_action"
            value="search"
            className="flex items-center rounded-r-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            <SearchIcon className="mr-2 h-5 w-5" />
            検索
          </button>
        </fetcher.Form>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCardWithFavorite key={article.url} article={article} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
