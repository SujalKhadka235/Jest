const mockDbWhere = vi.hoisted(() => vi.fn());
const mockDbObject = vi.hoisted(() => ({
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: mockDbWhere,
}));

vi.mock("../../../db/client.js", () => ({
  __esModule: true,
  db: mockDbObject,
}));

vi.mock("../../../db/schema.js", () => ({
  __esModule: true,
  usersTable: { email: "mockEmailColumn" },
}));

vi.mock("bcryptjs");
vi.mock("jsonwebtoken");

import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUserService } from "../loginUser.service.js";
import { usersTable } from "../../../db/schema.js";
import { eq } from "drizzle-orm";

describe("loginUserService", () => {
  const testEmail = "test@example.com";
  const testPassword = "password123";
  const hashedPassword = "hashedpassword";
  const userId = 1;
  const mockUser = { id: userId, email: testEmail, password: hashedPassword };
  const testJwtSecret = "test-secret";
  const generatedToken = "mocked.jwt.token";
  let originalJwtSecret: string | undefined;

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(bcrypt, "compare");
    vi.spyOn(jwt, "sign");

    mockDbObject.select.mockReturnThis();
    mockDbObject.from.mockReturnThis();

    originalJwtSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = testJwtSecret;
  });

  afterEach(() => {
    process.env.JWT_SECRET = originalJwtSecret;
  });

  it("should throw an error if user does not exist", async () => {
    mockDbWhere.mockResolvedValue([]);

    await expect(loginUserService(testEmail, testPassword)).rejects.toThrow(
      "user does not exist"
    );

    expect(mockDbWhere).toHaveBeenCalledTimes(1);
    expect(mockDbWhere).toHaveBeenCalledWith(eq(usersTable.email, testEmail));
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it("should throw an error if password does not match", async () => {
    mockDbWhere.mockResolvedValue([mockUser]);
    vi.mocked(bcrypt.compare).mockResolvedValue(false);

    await expect(loginUserService(testEmail, testPassword)).rejects.toThrow(
      "password does not match"
    );

    expect(mockDbWhere).toHaveBeenCalledTimes(1);
    expect(mockDbWhere).toHaveBeenCalledWith(eq(usersTable.email, testEmail));
    expect(bcrypt.compare).toHaveBeenCalledWith(testPassword, hashedPassword);
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it("should throw an error if JWT_SECRET is not defined", async () => {
    mockDbWhere.mockResolvedValue([mockUser]);
    vi.mocked(bcrypt.compare).mockResolvedValue(true);
    delete process.env.JWT_SECRET;

    await expect(loginUserService(testEmail, testPassword)).rejects.toThrow(
      "JWT_SECRET is not defined"
    );

    expect(mockDbWhere).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it("should return a JWT token if credentials are valid", async () => {
    mockDbWhere.mockResolvedValue([mockUser]);
    vi.mocked(bcrypt.compare).mockResolvedValue(true);
    vi.mocked(jwt.sign).mockReturnValue(generatedToken);

    const token = await loginUserService(testEmail, testPassword);

    expect(token).toBe(generatedToken);

    expect(mockDbWhere).toHaveBeenCalledTimes(1);
    expect(mockDbWhere).toHaveBeenCalledWith(eq(usersTable.email, testEmail));
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(testPassword, hashedPassword);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledWith({ _id: userId }, testJwtSecret, {
      expiresIn: "24h",
    });
  });
});
