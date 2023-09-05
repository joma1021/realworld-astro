import { validateInput } from "../../common/helpers";
import { createComment, deleteComment, getComments } from "../../services/comment-service";
import { useEffect, useState } from "preact/hooks";
import type { CommentData } from "../../models/comment";
import type { UserSessionData } from "../../models/user";

export interface CommentState {
  comments: CommentData[];
  hasError: boolean;
}

export default function Comments({ slug, userSession }: { slug: string; userSession: UserSessionData }) {
  const [commentState, setCommentState] = useState<CommentState>({ comments: [], hasError: false });
  const [isLoading, setIsLoading] = useState(false);
  const [refreshComments, setRefreshComments] = useState(false);

  const fetchComments = async () => {
    // TODO: Keep in mind
    // Keeping token in JS is not secure. A better solution is setting up a proxy server
    const token = userSession.token;

    const comments = await getComments(slug, token);
    setCommentState({ comments: comments, hasError: false });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchComments()
      .catch(() => {
        console.log("comment error");
        return setCommentState({ comments: [], hasError: true });
      })
      .then(() => setIsLoading(false));
  }, [refreshComments]);

  const onSubmitComment = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    const comment = event.target.comment.value;

    if (!validateInput(comment)) {
      setIsLoading(false);
      return;
    }

    const response = await createComment(slug, comment, userSession.token);
    if (!response.ok) {
      setIsLoading(false);
      return;
    }
    event.target.comment.value = "";
    setRefreshComments(!refreshComments);
    setIsLoading(false);
  };

  const onDeleteComment = async (commentId: number) => {
    const response = await deleteComment(slug, commentId, userSession.token);
    if (response.ok) setRefreshComments(!refreshComments);
  };

  if (commentState.hasError) {
    return (
      <>
        <div>An Error occured while fetching comments</div>
        <a href={window.location.href}>Please retry</a>
      </>
    );
  }

  return (
    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
        {userSession.isLoggedIn ? (
          <form class="card comment-form" onSubmit={onSubmitComment}>
            <div class="card-block">
              <textarea class="form-control" name="comment" placeholder="Write a comment..." rows={3}></textarea>
            </div>
            <div class="card-footer">
              <img src={userSession.image} class="comment-author-img" />
              <button class="btn btn-sm btn-primary" type="submit" disabled={isLoading}>
                Post Comment{" "}
              </button>
            </div>
          </form>
        ) : (
          <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2">
              <p>
                <a href="/login">Sign in</a>
                &nbsp; or &nbsp;
                <a href="/register">Sign up</a>
                &nbsp; to add comments on this article.
              </p>
            </div>
          </div>
        )}

        <div class="tag-list">
          {commentState.comments.map((comment) => (
            <div class="card" key={comment.id}>
              <div class="card-block">
                <p class="card-text">{comment.body}</p>
              </div>
              <div class="card-footer">
                <a href={`/profile/${comment.author}`} class="comment-author">
                  <img src={comment.author.image} class="comment-author-img" />
                </a>
                &nbsp;
                <a href={`/profile/${comment.author}`} class="comment-author">
                  {comment.author.username}
                </a>
                <span class="date-posted">{comment.createdAt}</span>
                {comment.author.username == userSession.username && (
                  <span class="mod-options">
                    <i class="ion-trash-a" onClick={() => onDeleteComment(comment.id)}></i>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
