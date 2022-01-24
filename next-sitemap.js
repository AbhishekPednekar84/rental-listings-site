module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://rentorsale.apartments",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
      },
    ],
  },
};
