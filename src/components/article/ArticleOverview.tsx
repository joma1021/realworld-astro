import type { ArticlesDTO } from "../../models/article";
import { getGlobalArticles, getYourArticles } from "../../services/article-service";
import ArticlePreview from "./ArticlePreview";
import { useEffect, useErrorBoundary, useState } from "preact/hooks";

interface ArticleOverviewState {
  articles: ArticlesDTO | null;
  hasError: boolean;
}

export default function ArticleOverview({ filter }: { filter: string }) {
  const feedFilter = filter ?? "global";
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [articlesState, setState] = useState<ArticleOverviewState>({ articles: null, hasError: false });

  const fetchArticles = async () => {
    if (feedFilter === "global") {
      const articles = await getGlobalArticles("", page);
      setState({ articles: articles, hasError: false });
    } else if (feedFilter === "your") {
      const articles = await getYourArticles("", page);
      setState({ articles: articles, hasError: false });
    } else {
      const articles = await getGlobalArticles("", page, feedFilter);
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
          <li class="nav-item">
            <a class={`nav-link ${feedFilter === "your" ? "active" : ""}`} href="/?filter=your">
              Your Feed
            </a>
          </li>
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

export function ErrorBoundary() {
  const [error, resetError] = useErrorBoundary();
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={resetError}>Try again</button>
    </div>
  );
}