export default function EditButton() {
  return (
    <form style={{ display: "inline-block" }} method="post">
      <button class="btn btn-sm btn-outline-secondary" type="submit" name="action" value="EDIT">
        <i class="ion-edit"></i> Edit Article
      </button>
    </form>
  );
}
