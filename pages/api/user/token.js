import cookie from "cookie";
// import Cookies from "universal-cookie";
// import { setCookies } from "cookies-next";

// const cookie = new Cookies();

export default async (req, res) => {
  // const cookie = new Cookies(req.headers.cookie);

  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", req.body, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "strict",
        path: "/",
      })
    );

    // if (strapiRes.ok) {
    //   //Set cookie
    //   res.setHeader(
    //     "Set-Cookie",
    //     cookie.serialize("token", data.jwt, {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV !== "development",
    //       maxAge: 60 * 60 * 24 * 7, // 1 week
    //       sameSite: "strict",
    //       path: "/",
    //     })
    //   );

    //   res.status(200).json({ user: data.user });
    // } else {
    //   res.status(data.error.status).json({ message: data.error.message });
    // }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json(`{message: ${req.method} not allowed}`);
  }
};
