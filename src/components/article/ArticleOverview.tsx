import type { ArticlesDTO } from "../../models/article";
import type { UserSessionData } from "../../models/user";
import { getGlobalArticles, getYourArticles } from "../../services/article-service";
import ArticlePreview from "./ArticlePreview";
import { useEffect, useState } from "preact/hooks";
import { userSessionStore } from "../../common/store";

interface ArticleOverviewState {
  articles: ArticlesDTO | null;
  hasError: boolean;
}

export default function ArticleOverview({ filter, userSession }: { filter: string; userSession: UserSessionData }) {
  userSessionStore.set(userSession);
  const feedFilter = filter ?? (userSession.isLoggedIn ? "your" : "global");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [articlesState, setState] = useState<ArticleOverviewState>({ articles: null, hasError: false });

  const fetchArticles = async () => {
    // TODO: Keep in mind
    // Keeping token in JS is not secure. A better solution is setting up a proxy server
    const token = userSession.token;

    if (feedFilter === "global") {
      const articles = await getGlobalArticles(token, page);
      setState({ articles: articles, hasError: false });
    } else if (feedFilter === "your") {
      const articles = await getYourArticles(token, page);
      setState({ articles: articles, hasError: false });
    } else {
      const articles = await getGlobalArticles(token, page, feedFilter);
      setState({ articles: articles, hasError: false });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchArticles()
      .catch(() => setState({ articles: null, hasError: true }))
      .then(() => setIsLoading(false));
  }, [page]);

  return (
    <div class="col-md-9">
      <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
          {userSession.isLoggedIn && (
            <li class="nav-item">
              <a class={`nav-link ${feedFilter === "your" ? "active" : ""}`} href="/?filter=your">
                Your Feed
              </a>
            </li>
          )}
          <li class="nav-item">
            <a class={`nav-link ${feedFilter === "global" ? "active" : ""}`} href="/?filter=global">
              Global Feed
            </a>
          </li>
          {feedFilter != "global" && feedFilter != "your" && (
            <li class="nav-item">
              <a class="nav-link active">#{feedFilter}</a>{" "}
            </li>
          )}
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
          {Array(Math.ceil((articlesState.articles?.articlesCount ?? 0) / 10))
            .fill(null)
            .map((_, i) => (
              <li class={`page-item  ${i == page - 1 ? "active" : ""}`} key={i}>
                <a
                  class="page-link"
                  style="cursor: pointer;"
                  onClick={() => {
                    setPage(i + 1);
                  }}
                >
                  {i + 1}
                </a>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
