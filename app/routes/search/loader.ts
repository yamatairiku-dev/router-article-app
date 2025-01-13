import { Article, type ArticleJson } from "~/domain/Article";
import type { Route } from "./+types/index";

export const fetchArticles = async function (keywords?: string) {
  const query = keywords
    ? `user:Sicut_study+title:${keywords}`
    : "user:Sicut_study";

  const res = await fetch(
    `https://qiita.com/api/v2/items?page=1&per_page=20&query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_API_KEY}`,
      },
    }
  );
  const articlesJson: ArticleJson[] = await res.json();
  const articles = articlesJson.map(
    (articleJson) =>
      new Article(
        articleJson.title,
        articleJson.url,
        articleJson.likes_count,
        articleJson.stocks_count,
        articleJson.created_at
      )
  );

  return { articles };
}

export const searchLoader = async function loader({ params }: Route.LoaderArgs) {
  const { articles } = await fetchArticles();
  return { articles };
}
