import prisma from "../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Please sign in to use this API." });
  }

  const prismaUser = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (req.method === "GET") {
    // Get all likes for a post
    try {
      const postId = req.query.postId as string;
      const likes = await prisma.heart.findMany({
        where: { postId: postId },
      });
      res.status(200).json(likes);
    } catch (err) {
      res.status(500).json({ err: "Error while getting likes." });
    }
  }

  if (req.method === "POST") {
    // Add or remove like for a post
    try {
      const postId = req.body.postId as string;
      const heart = await prisma.heart.findFirst({
        where: { postId: postId, userId: prismaUser?.id },
      });

      if (!heart) {
        const result = await prisma.heart.create({
          data: { postId: postId, userId: prismaUser?.id! },
        });
        res.status(201).json(result);
      } else {
        await prisma.heart.delete({ where: { id: heart.id } });
        res.status(200).json({ message: "Like removed." });
      }
    } catch (err) {
      res.status(500).json({ err: "Error while adding or removing like." });
    }
  }
}
