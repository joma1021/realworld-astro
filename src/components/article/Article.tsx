import { getArticle } from "../../services/article-service";
import EditButton from "../buttons/EditButton.tsx";
import DeleteButton from "../buttons/DeleteButton.tsx";
import FollowButton from "../buttons/FollowButton.tsx";
import FavoriteButton from "../buttons/FavoriteButton.tsx";
import Comments from "../../components/comments/Comments.tsx";
import type { UserSessionData } from "../../models/user.ts";
import { useEffect, useState } from "preact/hooks";
import type { ArticleData } from "../../models/article.ts";
import { isFollowingStore, favoriteStore } from "../../common/store";
import { userSessionStore } from "../../common/store";

interface ArticleState {
  article: ArticleData | null;
  hasError: boolean;
}

export default function Article({ slug, userSession }: { slug: string; userSession: UserSessionData }) {
  const [articlesState, setArticleState] = useState<ArticleState>();
  userSessionStore.set(userSession);

  const fetchArticle = async () => {
    // TODO: Keep in mind
    // Keeping token in JS is not secure. A better solution is setting up a proxy server
    const token = userSession.token;

    const article = await getArticle(slug, token);
    setArticleState({ article: article, hasError: false });
    isFollowingStore.set(article.author.following);
    favoriteStore.set({ favorite: article.favorited, favoritesCount: article.favoritesCount });
  };

  useEffect(() => {
    fetchArticle().catch(() => {
      setArticleState({ article: null, hasError: true });
    });
  }, []);

  if (articlesState?.hasError) {
    return (
      <>
        <div>An Error occured</div>
        <a href={window.location.href}>Please retry</a>
      </>
    );
  }
  if (articlesState?.article)
    return (
      <div class="article-page">
        <div class="banner">
          <div class="container">
            <h1>{articlesState.article.title}</h1>

            <div class="article-meta">
              <a href={`/profile/${articlesState.article.author.username}/articles`}>
                <img src={articlesState.article.author.image} />
              </a>

              <div class="info">
                <a href={`/profile/${articlesState.article.author.username}/articles`} class="author">
                  {articlesState.article.author.username}
                </a>
                <span class="date">{articlesState.article.createdAt}</span>
              </div>

              {articlesState.article.author.username == userSession.username ? (
                <>
                  <EditButton />
                  &nbsp;&nbsp;
                  <DeleteButton />
                </>
              ) : (
                <>
                  <FollowButton username={articlesState.article.author.username} />
                  &nbsp;&nbsp;
                  <FavoriteButton slug={slug} />
                </>
              )}
            </div>
          </div>
        </div>

        <div class="container page">
          <div class="row article-content">
            <div class="col-md-12">
              <ul class="tag-list">
                <p>{articlesState.article.body}</p>
                {articlesState.article.tagList.map((tag) => (
                  <li class="tag-default tag-pill tag-outline">{tag}</li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <div class="article-actions">
            <div class="article-meta">
              <a href={`/profile/${articlesState.article.author.username}/articles`}>
                <img src={articlesState.article.author.image} />
              </a>
              <div class="info">
                <a href={`/profile/${articlesState.article.author.username}/articles`} class="author">
                  {articlesState.article.author.username}
                </a>
                <span class="date">{articlesState.article.createdAt}</span>
              </div>
              {articlesState.article.author.username == userSession.username ? (
                <>
                  <EditButton />
                  &nbsp;&nbsp;
                  <DeleteButton />
                </>
              ) : (
                <>
                  <FollowButton username={articlesState.article.author.username} />
                  &nbsp;&nbsp;
                  <FavoriteButton slug={slug} />
                </>
              )}
            </div>
          </div>
          <Comments slug={slug} />
        </div>
      </div>
    );
}
