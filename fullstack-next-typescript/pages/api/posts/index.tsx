import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
          hearts: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error fatching posts" });
    }
  }
}

// export async function addLike(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions);
//   if (!session) {
//     return res.status(401).json({ message: "Please signin to create a post." });
//   }
//   //Get User
//   const prismaUser = await prisma.user.findUnique({
//     where: { email: session?.user?.email! },
//   });

//   //check to see if post was liked by user
//   const heart = await prisma.heart.findFirst({
//     where: {
//       postId: req.body.data.id,
//       userId: prismaUser?.id,
//     },
//   });
//   console.log(req.body);
//   if (req.method === "POST") {
//     //Add Like
//     try {
//       if (!heart) {
//         const result = await prisma.heart.create({
//           data: {
//             postId: req.body.data.id,
//             userId: prismaUser?.id!,
//           },
//         });
//         console.log(result);
//         res.status(201).json(result);
//       } else {
//         const result = await prisma.heart.delete({
//           where: {
//             id: heart.id,
//           },
//         });
//         res.status(200).json(result);
//       }
//     } catch (err) {
//       res.status(403).json({ err: "Error has occured while making a post" });
//     }
//   }
// }

// export async function addPost(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session) {
//       return res
//         .status(401)
//         .json({ message: "Please signin to create a post." });
//     }

//     const title: string = req.body.title;

//     //Get User
//     const prismaUser = await prisma.user.findUnique({
//       where: { email: session?.user?.email! },
//     });
//     //Check title
//     if (title.length > 300) {
//       return res.status(403).json({ message: "Please write a shorter post" });
//     }

//     if (!title.length) {
//       return res
//         .status(403)
//         .json({ message: "Please write something before we can post it." });
//     }

//     //Create Post
//     try {
//       const result = await prisma.post.create({
//         data: {
//           title,
//           userId: prismaUser?.id!,
//         },
//       });
//       res.status(200).json(result);
//     } catch (err) {
//       res.status(403).json({ err: "Error has occured while making a post" });
//     }
//   }
// }

// export async function authPost(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session) {
//       return res.status(401).json({ message: "Please sign in" });
//     }

//     //Get Auth Users Posts
//     try {
//       const data = await prisma.user.findUnique({
//         where: {
//           email: session.user?.email!,
//         },
//         include: {
//           posts: {
//             orderBy: {
//               createdAt: "desc",
//             },
//             include: {
//               comments: true,
//             },
//           },
//         },
//       });
//       res.status(200).json(data);
//     } catch (err) {
//       res.status(403).json({ err: "Error has occured while making a post" });
//     }
//   }
// }

// export async function deletePost(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions);
//   if (!session) {
//     return res.status(401).json({ message: "Please signin to create a post." });
//   }
//   if (req.method === "DELETE") {
//     const postId = req.body;
//     try {
//       const result = await prisma.post.delete({
//         where: {
//           id: postId,
//         },
//       });

//       res.status(200).json(result);
//     } catch (err) {
//       res.status(403).json({ err: "Error has occured while deleting a post" });
//     }
//   }
// }
