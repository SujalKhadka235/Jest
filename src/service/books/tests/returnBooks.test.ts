import { describe, it, expect, vi } from "vitest";
import { returnBookService } from "../../books/returnBook.service.js";

vi.mock("../../books/getBookbyId.service.js", () => ({
  getBookById: vi.fn(),
}));

vi.mock("../../../db/client.js", () => {
  const whereMock = vi.fn().mockResolvedValue("returned");
  const setMock = vi.fn(() => ({ where: whereMock }));
  const updateMock = vi.fn(() => ({ set: setMock }));

  return {
    db: {
      update: updateMock,
    },
  };
});

import { getBookById } from "../../books/getBookbyId.service.js";
import { db } from "../../../db/client.js";
import { booksTable } from "../../../db/schema.js";
import { eq } from "drizzle-orm";

describe("returnBookService", () => {
  it("should throw if book is not rented", async () => {
    (getBookById as any).mockResolvedValue({ statusId: 1 });

    await expect(returnBookService(1, 1)).rejects.toThrow(
      "This book has not been rented"
    );
  });

  it("should throw if book was rented by a different user", async () => {
    (getBookById as any).mockResolvedValue({ statusId: 2, userId: 999 });

    await expect(returnBookService(1, 1)).rejects.toThrow(
      "user id provided is not the one who rented this book"
    );
  });

  it("should update the book as returned", async () => {
    (getBookById as any).mockResolvedValue({ statusId: 2, userId: 1 });

    const result = await returnBookService(1, 1);

    expect(getBookById).toHaveBeenCalledWith(1);
    expect(db.update).toHaveBeenCalledWith(booksTable);
    expect(db.update(booksTable).set).toHaveBeenCalledWith({
      userId: null,
      statusId: 1,
    });
    expect(
      db.update(booksTable).set({ userId: null, statusId: 1 }).where
    ).toHaveBeenCalledWith(eq(booksTable.id, 1));
    expect(result).toBe("returned");
  });
});
