import { S3_BUCKET_BASE_URI } from "~/constants";

/**
 * Given the path to a poster inside the bucket, return the full URI
 */
export default function buildPosterURI(path: string) {
  return encodeURI(S3_BUCKET_BASE_URI + path);
}
