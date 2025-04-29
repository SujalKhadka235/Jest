import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import bcrypt from "bcryptjs";
import { createAuthorService } from "../createAuthor.service.js";
import { authorsTable } from "../../../db/schema.js";
import { db } from "../../../db/client.js";
import { eq } from "drizzle-orm";

describe("createAuthorService", () => {
  const testName = "John Doe";
  const testEmail = "john@example.com";
  const testPassword = "password123";
  const hashedPassword = "hashedpassword";
  const createdAuthorId = 1;

  const mockAuthor = {
    id: createdAuthorId,
    name: testName,
    email: testEmail,
    password: hashedPassword,
  };

  let originalBcryptHash: any;

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(bcrypt, "hash");

    const mockSelect = vi.fn().mockReturnThis();
    const mockFrom = vi.fn().mockReturnThis();
    const mockWhere = vi.fn().mockReturnThis();
    const mockInsertValues = vi.fn().mockReturnThis();
    const mockReturningId = vi.fn().mockResolvedValue(createdAuthorId);

    db.select = mockSelect;
    db.insert = vi.fn().mockReturnValue({
      values: mockInsertValues.mockReturnValue({
        $returningId: mockReturningId,
      }),
    });
    db.$returningId = mockReturningId;

    mockSelect.mockReturnValue({
      from: mockFrom,
      where: mockWhere,
    });

    db.where = mockWhere;
    db.$returningId = mockReturningId;

    mockFrom.mockReturnValue({ where: mockWhere });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should throw an error if the email is already taken", async () => {
    db.where.mockResolvedValue([mockAuthor]);

    await expect(
      createAuthorService(testName, testEmail, testPassword)
    ).rejects.toThrow("Email is already taken");

    expect(db.where).toHaveBeenCalledTimes(1);
    expect(db.where).toHaveBeenCalledWith(eq(authorsTable.email, testEmail));
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(db.insert).not.toHaveBeenCalled();
  });

  it("should hash the password and insert the author if the email is not taken", async () => {
    db.where.mockResolvedValue([]);

    vi.mocked(bcrypt.hash).mockResolvedValue(hashedPassword);

    const authorId = await createAuthorService(
      testName,
      testEmail,
      testPassword
    );

    expect(authorId).toBe(createdAuthorId);
    expect(db.where).toHaveBeenCalledTimes(1);
    expect(db.where).toHaveBeenCalledWith(eq(authorsTable.email, testEmail));
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(testPassword, 10);
    expect(db.insert).toHaveBeenCalledTimes(1);
    expect(db.insert).toHaveBeenCalledWith(authorsTable);
    expect(db.$returningId).toHaveBeenCalledTimes(1);
  });
});
