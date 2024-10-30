import * as crypto  from "crypto";

export class UUID {
  static randomUUID(): string {
    return crypto.randomUUID();
  }
}
