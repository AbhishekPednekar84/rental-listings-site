import cookie from "cookie";

export default async (req, res) => {
  // const cookie = new Cookies(req.headers.cookie);
  if (req.method === "POST") {
    const strapiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      //Set cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ token: data.access_token });
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json(`{message: ${req.method} not allowed}`);
  }
};
