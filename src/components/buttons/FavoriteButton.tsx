import { favoriteArticle, unfavoriteArticle } from "../../services/article-service";
import { useStore } from "@nanostores/preact";
import { favoriteStore } from "../../common/store";
import { useEffect } from "preact/hooks";
import type { UserSessionData } from "../../models/user";

export default function FavoriteButton({
  slug,
  favorited,
  favoritesCount,
  userSession,
}: {
  slug: string;
  favorited: boolean;
  favoritesCount: number;
  userSession: UserSessionData;
}) {
  const $favorite = useStore(favoriteStore);

  useEffect(() => {
    favoriteStore.set({ favorite: favorited, favoritesCount: favoritesCount });
  }, []);

  const handleOnClick = async () => {
    if ($favorite.favorite) {
      const response = await unfavoriteArticle(slug, userSession.token);
      if (response.ok) {
        favoriteStore.set({ favorite: false, favoritesCount: $favorite.favoritesCount - 1 });
      }
    } else {
      const response = await favoriteArticle(slug, userSession.token);
      if (response.ok) {
        favoriteStore.set({ favorite: true, favoritesCount: $favorite.favoritesCount + 1 });
      }
    }
  };

  return (
    <button
      class={`btn btn-sm btn-${$favorite.favorite ? "" : "outline-"}primary`}
      onClick={userSession.isLoggedIn ? handleOnClick : () => (window.location.href = "/register")}
    >
      <i class="ion-heart"></i>
      &nbsp; {$favorite.favorite ? "Unfavorite" : "Favorite"} Article <span class="counter">({$favorite.favoritesCount})</span>
    </button>
  );
}
