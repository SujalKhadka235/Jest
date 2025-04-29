import { vi, describe, it, expect } from "vitest";
import { db } from "../../../db/client.js";
import { booksTable } from "../../../db/schema.js";
import { addBookService } from "../addBook.service.js";
import { getAuthorById } from "../../authors/getAuthorById.service.js";

vi.mock("../../../db/client.js", () => {
  const mockDb = {
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockReturnThis(),
      $returningId: vi.fn().mockResolvedValue([{ id: 123 }]),
    }),
  };
  return { db: mockDb };
});

vi.mock("../../authors/getAuthorById.service.js", () => {
  return {
    getAuthorById: vi.fn(),
  };
});

describe("addBookService", () => {
  it("should throw an error if the author does not exist", async () => {
    (getAuthorById as any).mockResolvedValue(null);

    await expect(addBookService("Test Book", 1)).rejects.toThrow("Error");
  });

  it("should insert the book into the booksTable with statusId 1 and return the new book ID", async () => {
    (getAuthorById as any).mockResolvedValue({ id: 1 });
    const title = "Test Book";
    const authorId = 1;

    const newBookId = await addBookService(title, authorId);

    expect(getAuthorById).toHaveBeenCalledWith(authorId);

    expect(db.insert).toHaveBeenCalledWith(booksTable);

    expect(db.insert().values).toHaveBeenCalledWith(
      expect.objectContaining({
        title,
        authorId,
        statusId: 1,
      })
    );

    expect(newBookId).toBe(123);
  });
  it("should handle database errors during insertion", async () => {
    const dbError = new Error("Failed to insert book");
    (getAuthorById as any).mockResolvedValue({ id: 1 });
    (db.insert as any).mockImplementation(() => {
      throw dbError;
    });

    await expect(addBookService("Test Book", 1)).rejects.toThrow(dbError);
  });
});
