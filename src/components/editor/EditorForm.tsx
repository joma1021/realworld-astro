import { useState } from "preact/hooks";
import type { EditArticleData } from "../../models/article";

export default function EditorForm({ article }: { article?: EditArticleData }) {
  const [tagListState, setTagListState] = useState<string[]>(article?.tagList ?? []);
  const [titleState, setTitleState] = useState<string>(article?.title ?? "");
  const [bodyState, setBodyState] = useState<string>(article?.body ?? "");
  const [descriptionState, setDescriptionState] = useState<string>(article?.description ?? "");

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
          <input
            type="text"
            class="form-control form-control-lg"
            name="title"
            placeholder="Article Title"
            value={titleState}
            onInput={(event: any) => setTitleState(event.target.value)}
          />
        </fieldset>
        <fieldset class="form-group">
          <input
            type="text"
            class="form-control"
            name="description"
            placeholder="What's this article about?"
            value={descriptionState}
            onInput={(event: any) => setDescriptionState(event.target.value)}
          />
        </fieldset>
        <fieldset class="form-group">
          <textarea
            class="form-control"
            rows={8}
            name="body"
            placeholder="Write your article (in markdown)"
            onInput={(event: any) => setBodyState(event.target.value)}
          >
            {bodyState}
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
