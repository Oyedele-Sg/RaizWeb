/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "pixabay.com",
      `${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com`,
      `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
    ],
  },
}

module.exports = nextConfig
