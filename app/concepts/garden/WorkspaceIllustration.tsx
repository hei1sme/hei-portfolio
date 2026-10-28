"use client";

import BotanicalIllustration from "./BotanicalIllustration";
import WorkspaceDrawing from "./WorkspaceDrawing";

function workspaceRoute(t: number) {
  const a = 1 - t;
  return {
    x: a*a*a*150 + 3*a*a*t*320 + 3*a*t*t*635 + t*t*t*845,
    y: a*a*a*716 + 3*a*a*t*777 + 3*a*t*t*680 + t*t*t*715,
  };
}

export default function WorkspaceIllustration(props: Omit<Parameters<typeof BotanicalIllustration>[0], "Drawing" | "description" | "route">) {
  return <BotanicalIllustration {...props} Drawing={WorkspaceDrawing} route={workspaceRoute} description="My workspace reimagined in a blue tropical forest: a laptop and monitor on one desk, mechanical keyboard, mouse and tumbler, with my doodle duck running along the foreground path." />;
}
