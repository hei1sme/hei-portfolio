export default function MethodDrawing({ project }: { project: string }) {
  return (
    <svg className="garden-method-drawing" viewBox="0 0 780 500" role="img" aria-label={project === "asr" ? "Speech recognition architecture schematic: audio to CNN, BiLSTM, CTC and text. Not measured audio." : "PPE system schematic: image input, YOLOv8 detections, compliance logic and report. Not measured detections."}>
      {project === "asr" ? <>
        <text x="48" y="67" className="garden-svg-title">Sound becomes language.</text>
        <g fill="none" stroke="currentColor" strokeWidth="3">
          {Array.from({length: 40}, (_, i) => { const h = 20 + Math.sin(i * 0.7) ** 2 * 82; return <path key={i} d={`M${55+i*6} ${(212-h/2).toFixed(2)}v${h.toFixed(2)}`} />; })}
          <path d="M340 210h65m-12-10 12 10-12 10M563 210h65m-12-10 12 10-12 10" />
          <rect x="420" y="138" width="126" height="145" rx="24" />
        </g>
        <text x="483" y="202" textAnchor="middle">CNN</text><text x="483" y="233" textAnchor="middle">BiLSTM</text>
        <text x="659" y="215" fontSize="35">Aa</text>
        <text x="48" y="405">5.4M parameters</text><text x="48" y="441" opacity="0.7">745-hour Vietnamese speech corpus</text>
      </> : <>
        <text x="48" y="67" className="garden-svg-title">From pixels to safety checks.</text>
        <g fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M65 143h45m-45 0v45m230-45h-45m45 0v45M65 320h45m-45 0v-45m230 45h-45m45 0v-45" />
          <circle cx="180" cy="196" r="27" /><path d="M140 292v-49q40-30 80 0v49" />
          <path d="M353 230h65m-12-10 12 10-12 10" />
          <rect x="455" y="153" width="260" height="150" rx="26" />
        </g>
        <text x="585" y="218" textAnchor="middle">YOLOv8</text><text x="585" y="254" textAnchor="middle">Compliance logic</text>
        <text x="48" y="405">9 PPE classes</text><text x="48" y="441" opacity="0.7">Webcam input · Streamlit interface</text>
      </>}
    </svg>
  );
}
