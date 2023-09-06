import { useState } from "preact/hooks";
import type { EditArticleData } from "../../models/article";

export default function EditorForm({ article }: { article?: EditArticleData }) {
  const [tagListState, setTagListState] = useState<string[]>(article?.tagList ?? []);

  function removeTag(tag: string): void {
    const newTagList = tagListState.filter((t) => t != tag);
    setTagListState(newTagList);
  }

  function updateTags(event: any): void {
    const tags = event.target.value;
    setTagListState(tags.split(","));
  }
  return (
    <form method="post">
      <fieldset>
        <fieldset class="form-group">
          <input type="text" class="form-control form-control-lg" name="title" placeholder="Article Title" value={article?.title} />
        </fieldset>
        <fieldset class="form-group">
          <input type="text" class="form-control" name="description" placeholder="What's this article about?" value={article?.description} />
        </fieldset>
        <fieldset class="form-group">
          <textarea class="form-control" rows={8} name="body" placeholder="Write your article (in markdown)">
            {article?.body}
          </textarea>
        </fieldset>
        <fieldset class="form-group">
          <input type="text" class="form-control" id="tags" name="tags" placeholder="Enter tags" value={tagListState.toString()} onInput={updateTags} />
          <div class="tag-list">
            {tagListState.map((tag) => (
              <span class="tag-default tag-pill" key={tag}>
                <i class="ion-close-round" onClick={() => removeTag(tag)}></i> {tag}
              </span>
            ))}
          </div>
        </fieldset>
        <button type="submit" class="btn btn-lg pull-xs-right btn-primary">
          {article ? "Update Article" : "Publish Article"}
        </button>
      </fieldset>
    </form>
  );
}
