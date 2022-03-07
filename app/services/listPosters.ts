import { ListObjectsCommand } from "@aws-sdk/client-s3";

import client from "./getS3Client";

const command = new ListObjectsCommand({ Bucket: "ea-posters" });

export default function listPosters() {
  return client.send(command);
}
