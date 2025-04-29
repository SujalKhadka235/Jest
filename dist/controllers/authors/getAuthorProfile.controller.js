import { getAuthorProfileService } from "../../service/authors/getAuthorProfile.service.js";
export const getAuthorProfile = async (req, res) => {
    try {
        const authorId = req.author?._author_id;
        const authorData = await getAuthorProfileService(authorId);
        res.status(200).json({ Your_profile: authorData });
        return;
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
