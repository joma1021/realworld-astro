import { useState } from "preact/hooks";
import { favoriteArticle, unfavoriteArticle } from "../../services/article-service";
import { useStore } from "@nanostores/preact";
import type { UserSessionData } from "../../models/user";

interface FavoriteState {
  favorite: boolean;
  count: number;
}

export function FavoriteActionButton({
  favorited,
  favoritesCount,
  slug,
  userSession,
}: {
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  userSession: UserSessionData;
}) {
  const [favoriteState, setFavoriteState] = useState<FavoriteState>({ favorite: favorited, count: favoritesCount });

  const handleOnClick = async () => {
    if (favoriteState.favorite) {
      const response = await unfavoriteArticle(slug, userSession.token);
      if (response.ok) {
        setFavoriteState({ favorite: false, count: favoriteState.count - 1 });
      }
    } else {
      const response = await favoriteArticle(slug, userSession.token);
      if (response.ok) {
        setFavoriteState({ favorite: true, count: favoriteState.count + 1 });
      }
    }
  };

  return (
    <button
      class={`btn btn-${!favoriteState.favorite ? "outline-" : ""}primary btn-sm pull-xs-right`}
      onClick={userSession.isLoggedIn ? handleOnClick : () => (window.location.href = "/register")}
    >
      <i class="ion-heart"></i> {favoriteState.count}
    </button>
  );
}
