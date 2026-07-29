export const BASE_URL = "https://api.realworld.show/api";

/** Default avatar used by the RealWorld demo when a user has no image set. */
export const DEFAULT_IMAGE =
  "https://raw.githubusercontent.com/gothinkster/node-express-realworld-example-app/refs/heads/master/src/assets/images/smiley-cyrus.jpeg";

export function resolveImage(image?: string | null): string {
  return image && image.length > 0 ? image : DEFAULT_IMAGE;
}
