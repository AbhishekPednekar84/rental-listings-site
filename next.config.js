// const ContentSecurityPolicy = `
// default-src 'self';
// script-src 'self';
// style-src 'self';
// `;

// const securityHeaders = [
//   {
//     key: "Content-Security-Policy",
//     value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
//   },
// ];

module.exports = {
  images: {
    domains: ["ik.imagekit.io"],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src * ${
              process.env.NODE_ENV === "development" && "data: 'unsafe-eval'"
            }; script-src 'self' www.google.com www.gstatic.com ${
              process.env.NODE_ENV === "development" && "data: 'unsafe-eval'"
            }; img-src * data: blob:; style-src * data: 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com data: 'unsafe-inline'; object-src 'self' blob:`,
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
};
