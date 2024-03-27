import prisma from "../../../prisma/prisma.js";

export default async function handler(req, res) {
  const { noteId } = req.query;
  const { title, content } = req.body;

  if (req.method === "PUT") {
    const id = parseInt(noteId);
    console.log(id);
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "Note ID must be a valid number" });
    }

    try {
      const updatedNote = await prisma.note.update({
        where: { id },
        data: {
          title,
          content,
        },
      });
      res.json(updatedNote);
    } catch (error) {
      console.error("Failed to update note:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else if (req.method === "DELETE") {
    const id = parseInt(noteId);

    if (!id || isNaN(id)) {
      return res.status(400).send("ID field required");
    }

    try {
      await prisma.note.delete({
        where: { id },
      });
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .send("Something went wrong when trying to delete the note!");
    }
  }
}
