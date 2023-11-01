/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "pixabay.com",
      `${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com`,
      `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
      "raiz-dev-assets.s3.us-east-1.amazonaws.com",
    ],
  },
}

module.exports = nextConfig
