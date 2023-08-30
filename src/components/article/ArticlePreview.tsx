import type { ArticleData } from "../../models/article";

export default function ArticlePreview({ article }: { article: ArticleData }) {
  return (
    <div class="article-preview">
      <div class="article-meta">
        <a href={`/profile/${article.author.username}`}>
          <img src={`${article.author.image}`} />
        </a>
        <div class="info">
          <a href={`/profile/${article.author.username}`} class="author">
            {article.author.username}
          </a>
          <span class="date">{article.createdAt}</span>
        </div>
        {/* <FavoriteButtonSmall
      favorite={article.favorited}
      count={article.favoritesCount}
      slug={article.slug}
    />  */}
      </div>
      <a href={`/article/${article.slug}`} class="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          {article.tagList.map((tag: string) => (
            <li class="tag-default tag-pill tag-outline">{tag}</li>
          ))}
        </ul>
      </a>
    </div>
  );
}
