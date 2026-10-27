import Image from "next/image";
import type { ImgHTMLAttributes } from "react";

export const projectMdxComponents = {
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => <Image src={typeof props.src === "string" ? props.src : ""} alt={props.alt || "Project figure"} width={1200} height={750} sizes="(max-width: 900px) 100vw, 760px" />,
};
