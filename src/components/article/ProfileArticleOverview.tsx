import type { ArticlesDTO } from "../../models/article";
import type { UserSessionData } from "../../models/user";
import { getProfileArticles } from "../../services/article-service";
import ArticlePreview from "./ArticlePreview";
import { useEffect, useState } from "preact/hooks";

interface ArticleOverviewState {
  articles: ArticlesDTO | null;
  hasError: boolean;
}

export default function ProfileArticleOverview({ userSession, username }: { userSession: UserSessionData; username: string }) {
  const [pageState, setPageState] = useState({ filter: "my", page: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [articlesState, setState] = useState<ArticleOverviewState>({ articles: null, hasError: false });

  const fetchArticles = async () => {
    // TODO: Keep in mind
    // Keeping token in JS is not secure. A better solution is setting up a proxy server
    const token = userSession.token;

    if (pageState.filter === "my") {
      const articles = await getProfileArticles(username, pageState.filter, userSession.token, pageState.page);
      setState({ articles: articles, hasError: false });
    } else {
      const articles = await getProfileArticles(username, pageState.filter, userSession.token, pageState.page);
      setState({ articles: articles, hasError: false });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchArticles()
      .catch(() => setState({ articles: null, hasError: true }))
      .then(() => setIsLoading(false));
  }, [pageState]);

  return (
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class={`nav-link ${pageState.filter === "my" ? "active" : ""}`}
                  onClick={() => {
                    setPageState({ filter: "my", page: 1 });
                  }}
                >
                  My Articles
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={`nav-link ${pageState.filter === "fav" ? "active" : ""}`}
                  onClick={() => {
                    setPageState({ filter: "fav", page: 1 });
                  }}
                >
                  Favorite Articles
                </a>
              </li>
            </ul>
          </div>
          {articlesState.hasError && <div>Error: An error occurred while fetching data</div>}
          {isLoading ? (
            <div>Loading Articles...</div>
          ) : (
            <div>
              {articlesState.articles?.articlesCount == 0 ? (
                <div>No articles are here... yet.</div>
              ) : (
                <ul>{articlesState.articles?.articles.map((article) => <ArticlePreview article={article} />)}</ul>
              )}
            </div>
          )}

          {!isLoading && (
            <ul class="pagination">
              {Array(Math.ceil((articlesState.articles?.articlesCount ?? 0) / 5))
                .fill(null)
                .map((_, i) => (
                  <li class={`page-item  ${i == pageState.page - 1 ? "active" : ""}`} key={i}>
                    <a
                      class="page-link"
                      style="cursor: pointer;"
                      onClick={() => {
                        setPageState({ filter: pageState.filter, page: i + 1 });
                      }}
                    >
                      {i + 1}
                    </a>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
