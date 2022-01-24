import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { formData } = req.body;

    const strapiRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/listings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { formData } }),
      }
    );

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json(data);
    } else {
      res.status(data.error.status).json({ message: data.error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json(`${req.method} not allowed`);
  }
};
