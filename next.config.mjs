/** Keep production defaults; a local build directory can live on another disk. */
const nextConfig = {
  distDir: process.env.PORTFOLIO_DIST_DIR || ".next",
};

export default nextConfig;
