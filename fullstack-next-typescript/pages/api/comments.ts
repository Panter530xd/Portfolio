import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { z } from "zod";

const commentSchema = z.object({
  title: z.string().min(1),
  postId: z.string().uuid(),
});

type CommentData = z.infer<typeof commentSchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // GET FOR COMMENTS
    try {
      const data = await prisma.comment.findMany({
        include: {
          user: true, // include the related user for each comment
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error fetching posts" });
    }
  }

  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res
        .status(401)
        .json({ message: "Please signin to post a comment." });
    }

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });

    if (!prismaUser) {
      res.status(404).json({ err: "No such user in DB." });
      return;
    }

    let commentData: CommentData;
    try {
      commentData = commentSchema.parse(req.body.data);
    } catch (error) {
      res.status(401).json({ message: "Invalid Data" });
      return;
    }

    try {
      const result = await prisma.comment.create({
        data: {
          title: commentData.title,
          userId: prismaUser.id,
          postId: commentData.postId,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res
        .status(403)
        .json({ err: "Error has occurred while making a post" });
    }
  }
}
