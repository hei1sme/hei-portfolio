import GardenPortfolio from "./concepts/garden/GardenPortfolio";
import GardenBackground from "./concepts/garden/GardenBackground";
import GardenPublications from "./concepts/garden/GardenPublications";
import { getSortedPostsData } from "../lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return <GardenPortfolio production posts={getSortedPostsData()} background={<GardenBackground />} publications={<GardenPublications />} />;
}
