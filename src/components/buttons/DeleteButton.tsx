export default function DeleteButton() {
  return (
    <form style={{ display: "inline-block" }} method="post">
      <button class="btn btn-sm btn-outline-danger" type="submit" name="action" value="DELETE">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </form>
  );
}
