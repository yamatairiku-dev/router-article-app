import type { Route } from "./+types/index";
import { fetchArticles } from "./loader"

export const searchAction = async function action({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case "search": {
      const keywords = formData.get("keywords") as string;
      const { articles } = await fetchArticles(keywords);
      return { articles };
    }

    case "like": {
      const title = formData.get("title");
      console.log(`${title}をお気に入り登録しました`);

      const { articles } = await fetchArticles();
      return { articles };
    }
  }
}
