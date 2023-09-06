import EditButton from "../buttons/EditButton.tsx";
import DeleteButton from "../buttons/DeleteButton.tsx";
import FollowButton from "../buttons/FollowButton.tsx";
import FavoriteButton from "../buttons/FavoriteButton.tsx";
import Comments from "../../components/comments/Comments.tsx";
import type { UserSessionData } from "../../models/user.ts";
import type { ArticleData } from "../../models/article.ts";
import { isFollowingStore, favoriteStore } from "../../common/store";
import { userSessionStore } from "../../common/store";

export default function Article({ article, userSession }: { article: ArticleData; userSession: UserSessionData }) {
  userSessionStore.set(userSession);
  isFollowingStore.set(article.author.following);
  favoriteStore.set({ favorite: article.favorited, favoritesCount: article.favoritesCount });

  return (
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{article.title}</h1>

          <div class="article-meta">
            <a href={`/profile/${article.author.username}/articles`}>
              <img src={article.author.image} />
            </a>

            <div class="info">
              <a href={`/profile/${article.author.username}/articles`} class="author">
                {article.author.username}
              </a>
              <span class="date">{article.createdAt}</span>
            </div>

            {article.author.username == userSession.username ? (
              <>
                <EditButton />
                &nbsp;&nbsp;
                <DeleteButton />
              </>
            ) : (
              <>
                <FollowButton username={article.author.username} />
                &nbsp;&nbsp;
                <FavoriteButton slug={article.slug} />
              </>
            )}
          </div>
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12">
            <ul class="tag-list">
              <p>{article.body}</p>
              {article.tagList.map((tag) => (
                <li class="tag-default tag-pill tag-outline">{tag}</li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div class="article-actions">
          <div class="article-meta">
            <a href={`/profile/${article.author.username}/articles`}>
              <img src={article.author.image} />
            </a>
            <div class="info">
              <a href={`/profile/${article.author.username}/articles`} class="author">
                {article.author.username}
              </a>
              <span class="date">{article.createdAt}</span>
            </div>
            {article.author.username == userSession.username ? (
              <>
                <EditButton />
                &nbsp;&nbsp;
                <DeleteButton />
              </>
            ) : (
              <>
                <FollowButton username={article.author.username} />
                &nbsp;&nbsp;
                <FavoriteButton slug={article.slug} />
              </>
            )}
          </div>
        </div>
        <Comments slug={article.slug} />
      </div>
    </div>
  );
}
