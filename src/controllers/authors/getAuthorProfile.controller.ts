import { Request, Response } from "express";
import { getAuthorProfileService } from "../../service/authors/getAuthorProfile.service.js";

export const getAuthorProfile = async (
  req: any,
  res: Response
): Promise<void> => {
  try {
    const authorId = req.author?._author_id;
    const authorData = await getAuthorProfileService(authorId);
    res.status(200).json({ Your_profile: authorData });
    return;
  } catch (err: any) {
    res.status(500).json({ err: err.message });
    return;
  }
};
