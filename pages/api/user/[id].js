import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "PUT") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not authorized" });
      return;
    }

    const { username } = req.body;

    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${req.query.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
        }),
      }
    );

    const user = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json(`{message: ${req.method} not allowed}`);
  }
};
