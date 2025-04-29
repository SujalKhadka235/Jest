import { vi, describe, it, expect } from "vitest";

vi.mock("../getUserById.service.js", () => {
  return {
    getUserById: vi.fn(),
  };
});

import { getUserById } from "../getUserById.service.js";
import { checkUserPassword } from "../checkUserPassword.service.js";
import bcrypt from "bcryptjs";

describe("checkUserPassword", () => {
  it("should throw an error if input is invalid", async () => {
    await expect(checkUserPassword(null as any, "")).rejects.toThrow(
      "invalid input"
    );
  });

  it("should throw an error if password does not match", async () => {
    (getUserById as any).mockResolvedValue({ password: "hashedpassword" });
    vi.spyOn(bcrypt, "compare").mockResolvedValue(false);

    await expect(checkUserPassword(1, "wrongpassword")).rejects.toThrow(
      "password does not match"
    );
  });

  it("should return true if password matches", async () => {
    (getUserById as any).mockResolvedValue({ password: "hashedpassword" });
    vi.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const result = await checkUserPassword(1, "correctpassword");
    expect(result).toBe(true);
  });
});
