import { createHash } from "node:crypto";

export default function hash(bank: string, referenceNumber: string) {
  const kefayID = createHash("sha256")
    .update(`${bank}:${referenceNumber}`)
    .digest("hex");

  return kefayID;
}
