import { followUser, unfollowUser } from "../../services/profile-service";

import { isFollowingStore, userSessionStore } from "../../common/store";
import { useStore } from "@nanostores/preact";

export default function FollowButton({ username }: { username: string }) {
  const $isFollowing = useStore(isFollowingStore);
  const $userSession = useStore(userSessionStore);

  const handleOnClick = async () => {
    if ($isFollowing) {
      const response = await unfollowUser(username, $userSession.token);
      if (response.ok) {
        isFollowingStore.set(false);
      }
    } else {
      const response = await followUser(username, $userSession.token);
      if (response.ok) {
        isFollowingStore.set(true);
      }
    }
  };

  return (
    <button
      class={`btn btn-sm btn-${!$isFollowing ? "outline-" : ""}secondary`}
      onClick={$userSession.isLoggedIn ? handleOnClick : () => (window.location.href = "/register")}
    >
      <i class="ion-plus-round"></i>
      &nbsp; {$isFollowing ? "Unfollow" : "Follow"} {username} <span class="counter"></span>
    </button>
  );
}
