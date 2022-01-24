import ImageKit from "imagekit";

var imagekit = new ImageKit({
  publicKey: "public_HGMDL2y0YZrsTa9wYNO6zy6loKY=",
  privateKey: "private_fzFyAgJliwi3yiWMGWCtYSInUPk=",
  urlEndpoint: "https://ik.imagekit.io/ykidmzssaww/",
});

export default async (req, res) => {
  const { id } = req.query;

  const images = await imagekit.listFiles({
    path: "Listings",
  });

  images
    .filter((img) => img.fileId === id)
    .map((i) => imagekit.deleteFile(i.fileId));

  res.status(200).json({ message: "Image Deleted" });
};
