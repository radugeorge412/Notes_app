import prisma from "../../../prisma/prisma.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const notes = await prisma.note.findMany();
    res.status(200).json(notes);
  } else if (req.method === "POST") {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).send("Title and content are required");
    }

    try {
      const note = await prisma.note.create({
        data: {
          title,
          content,
        },
      });
      res.json(note);
    } catch (error) {
      res.status(500).send("Something went wrong!");
    }
  }
}
