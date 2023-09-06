import { favoriteArticle, unfavoriteArticle } from "../../services/article-service";
import { useStore } from "@nanostores/preact";
import { favoriteStore, userSessionStore } from "../../common/store";

export default function FavoriteButton({ slug }: { slug: string }) {
  const $isFollowing = useStore(favoriteStore);
  const $userSession = useStore(userSessionStore);

  const handleOnClick = async () => {
    if ($isFollowing.favorite) {
      const response = await unfavoriteArticle(slug, $userSession.token);
      if (response.ok) {
        favoriteStore.set({ favorite: false, favoritesCount: $isFollowing.favoritesCount - 1 });
      }
    } else {
      const response = await favoriteArticle(slug, $userSession.token);
      if (response.ok) {
        favoriteStore.set({ favorite: true, favoritesCount: $isFollowing.favoritesCount + 1 });
      }
    }
  };

  return (
    <button
      class={`btn btn-sm btn-${!$isFollowing.favorite ? "outline-" : ""}primary`}
      onClick={$userSession.isLoggedIn ? handleOnClick : () => (window.location.href = "/register")}
    >
      <i class="ion-heart"></i>
      &nbsp; {$isFollowing.favorite ? "Unfavorite" : "Favorite"} Article <span class="counter">({$isFollowing.favoritesCount})</span>
    </button>
  );
}
