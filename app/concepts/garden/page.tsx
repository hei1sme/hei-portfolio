import { redirect } from "next/navigation";

// Existing preview bookmarks now lead to the completed main site.
export default function GardenPreview() { redirect("/"); }
