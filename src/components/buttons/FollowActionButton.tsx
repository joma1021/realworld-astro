import { useState } from "preact/hooks";
import type { UserSessionData } from "../../models/user";
import { followUser, unfollowUser } from "../../services/profile-service";

export default function FollowActionButton({ following, username, userSession }: { following: boolean; username: string; userSession: UserSessionData }) {
  const [isFollowing, setIsFollowing] = useState(following);

  const handleOnClick = async () => {
    if (isFollowing) {
      const response = await unfollowUser(username, userSession.token);
      if (response.ok) {
        setIsFollowing(false);
      }
    } else {
      const response = await followUser(username, userSession.token);
      if (response.ok) {
        setIsFollowing(true);
      }
    }
  };

  return (
    <button
      class={`btn btn-sm btn-${!isFollowing ? "outline-" : ""}secondary action-btn`}
      onClick={userSession.isLoggedIn ? handleOnClick : () => (window.location.href = "/register")}
    >
      <i class="ion-plus-round"></i>
      &nbsp; {isFollowing ? "Unfollow" : "Follow"} {username} <span class="counter"></span>
    </button>
  );
}
