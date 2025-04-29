import { describe, it, expect, vi } from "vitest";
import { rentBookService } from "../../books/rentBook.service.js";
import { eq } from "drizzle-orm";

vi.mock("../../user/getUserById.service.js", () => ({
  getUserById: vi.fn(),
}));

vi.mock("../../books/getBookbyId.service.js", () => ({
  getBookById: vi.fn(),
}));

vi.mock("../../../db/client.js", () => {
  const whereMock = vi.fn().mockResolvedValue("updated");
  const setMock = vi.fn(() => ({ where: whereMock }));
  const updateMock = vi.fn(() => ({ set: setMock }));

  return {
    db: {
      update: updateMock,
    },
  };
});

import { getUserById } from "../../user/getUserById.service.js";
import { getBookById } from "../../books/getBookbyId.service.js";
import { db } from "../../../db/client.js";
import { booksTable } from "../../../db/schema.js";

describe("rentBookService", () => {
  it("should throw an error if the book is already rented", async () => {
    (getBookById as any).mockResolvedValue({ statusId: 2 });
    await expect(rentBookService(1, 1)).rejects.toThrow(
      "Book is already rented and not availabe"
    );
  });

  it("should rent the book to the user when the book is available", async () => {
    (getUserById as any).mockResolvedValue({ id: 1 });
    (getBookById as any).mockResolvedValue({ statusId: 1 });

    const result = await rentBookService(1, 1);

    expect(getUserById).toHaveBeenCalledWith(1);
    expect(getBookById).toHaveBeenCalledWith(1);
    expect(db.update).toHaveBeenCalledWith(booksTable);
    expect(db.update(booksTable).set).toHaveBeenCalledWith({
      userId: 1,
      statusId: 2,
    });
    expect(
      db.update(booksTable).set({ userId: 1, statusId: 2 }).where
    ).toHaveBeenCalledWith(eq(booksTable.id, 1));
    expect(result).toBe("updated");
  });
});
