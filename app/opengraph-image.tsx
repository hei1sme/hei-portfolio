import { ImageResponse } from "next/og";

export const alt = "hei — Le Nguyen Gia Hung. AI research and things in motion.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", background: "#214ce8", color: "white", padding: "65px 75px", display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "sans-serif" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 68, fontWeight: 700 }}>hei ✳</span><span style={{ fontSize: 24 }}>Le Nguyen Gia Hung</span></div><div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 85, fontWeight: 600, lineHeight: 1.08 }}>Seeing beyond</span><span style={{ fontSize: 85, fontWeight: 600, lineHeight: 1.08 }}>the prediction.</span></div><div style={{ display: "flex", fontSize: 25, color: "#d7ed91" }}>Explainable AI · Computer vision · Time-series forecasting</div></div>, size);
}
