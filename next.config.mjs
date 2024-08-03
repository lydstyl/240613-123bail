/** @type {import('next').NextConfig} */
const nextConfig = {
  //   experimental: {
  //     outputFileTracingIncludes: {
  //       '/api/generateLease': ['./tmp/**/*'],
  //       '/api/downloadDocx': ['./tmp/**/*']
  //     }
  //   }
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
}

export default nextConfig
