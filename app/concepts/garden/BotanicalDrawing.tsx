import type { ReactNode } from "react";

// Editable, flat SVG artwork. The layers share a 900 × 800 drawing space.
// This is an imagined courtyard, not a photograph of the owner's home.
export default function BotanicalDrawing({ character }: { character?: ReactNode }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 800" fill="none" aria-hidden="true" className="botanical-drawing">
    <defs>
      <g id="botanical-heart">
        <path d="M0 0C-34-2-77-37-75-76C-73-113-24-132 0-156C29-125 74-103 68-64C61-23 25-4 0 0Z" fill="currentColor" stroke="#152344" strokeWidth="1.15" />
        <path d="M0-2Q-9-73 0-150M-3-31Q-37-44-57-66M-4-58Q-31-69-48-90M-4-82Q-23-94-27-111M-2-32Q29-43 49-62M-3-59Q26-69 42-89M-3-84Q17-94 23-111" stroke="#152344" strokeWidth=".8" opacity=".55" />
      </g>
      <g id="botanical-split">
        <path fillRule="evenodd" d="M0 0C-20 5-49-9-54-31C-58-45-28-37-17-49C-26-55-58-43-62-61C-68-79-39-88-16-87C-24-100-53-88-50-107C-45-125-19-134 1-165C18-143 41-133 46-118C49-106 23-108 15-98C25-96 53-109 57-92C62-73 32-66 17-64C27-55 58-65 58-47C58-20 26-2 0 0ZM-23-35A5 9-25 1 0-18-51A5 9-25 1 0-23-35ZM19-77A4 8 25 1 0 14-91A4 8 25 1 0 19-77Z" fill="currentColor" stroke="#152344" strokeWidth="1.2" />
        <path d="M0-2Q-6-83 1-157M-1-28Q-28-33-42-28M-2-58Q-25-73-46-70M-2-94Q-26-112-38-109M-2-31Q25-37 43-42M-3-68Q28-82 43-88M-1-106Q19-124 31-126" stroke="#152344" strokeWidth=".8" opacity=".6" />
      </g>
      <g id="botanical-palm">
        <path d="M0 0C-2-68 14-137 17-194" stroke="currentColor" strokeWidth="3" />
        {[
          "M3-30Q-43-37-55-72Q-18-66 3-30Z", "M6-53Q42-68 50-99Q15-91 6-53Z",
          "M7-75Q-34-85-40-118Q-5-106 7-75Z", "M11-99Q48-115 53-147Q24-139 11-99Z",
          "M13-125Q-21-139-23-164Q4-153 13-125Z", "M15-146Q41-161 42-186Q21-178 15-146Z",
          "M16-168Q3-190 19-211Q26-188 16-168Z",
        ].map(d => <path key={d} d={d} fill="currentColor" stroke="#152344" strokeWidth=".7" />)}
      </g>
      <clipPath id="botanical-window-clip"><path d="M198 430V243C198 151 265 101 353 101C440 101 508 154 508 243V430Z" /></clipPath>
      <clipPath id="botanical-duck-crop"><rect x="0" y="3.72" width="124" height="120.28" /></clipPath>
    </defs>

    <g data-botanical-layer="back">
      <path d="M188 443V242C188 140 262 89 353 89C447 89 521 147 521 242V443Z" fill="#d2dff1" />
      <path d="M198 430V243C198 151 265 101 353 101C440 101 508 154 508 243V430Z" fill="#f8faf9" stroke="#152344" strokeWidth="1.7" />
      <g clipPath="url(#botanical-window-clip)">
        <path d="M190 330L520 183V215L190 362Z" fill="#e1ebf5" />
        <path d="M190 382L520 235V248L190 395Z" fill="#e1ebf5" />
        <path d="M353 102V430M198 273H508" stroke="#829ac1" strokeWidth="1.5" />
        <use href="#botanical-palm" transform="translate(471 440) rotate(-22) scale(1.5)" color="#d4e1f1" />
      </g>
      <path d="M177 445H529M188 242C188 140 262 89 353 89C447 89 521 147 521 242" stroke="#152344" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M555 210H766V490H555Z" fill="#d8e4f0" stroke="#152344" strokeWidth="1.4" />
      {[0,1,2,3].flatMap(row => [0,1,2].map(column => {
        const x = 561 + column * 67, y = 217 + row * 67;
        return <g key={`${row}-${column}`}>
          <path d={`M${x} ${y}h64v64h-64Z`} stroke="#9bb2d5" strokeWidth="1" />
          <path d={`M${x+32} ${y+8}Q${x+27} ${y+26} ${x+8} ${y+32}Q${x+26} ${y+37} ${x+32} ${y+56}Q${x+38} ${y+38} ${x+56} ${y+32}Q${x+37} ${y+26} ${x+32} ${y+8}Z`} fill="#f6f8f7" stroke="#b0c2de" strokeWidth="1" />
        </g>;
      }))}
      <path d="M191 462H770V550H191Z" fill="#e0e8f2" />
      <path d="M190 461H773M191 462V550H773" stroke="#7895c1" strokeWidth="1.3" />
      <path d="M186 476V526H145V563H108V598H403" stroke="#152344" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M145 526H267M108 563H248" stroke="#9cb4d5" strokeWidth="1.4" />
    </g>

    <g data-botanical-layer="middle">
      <path d="M150 643C325 735 603 569 850 619L857 696C594 643 346 796 114 704Z" fill="#dce7ef" />
      <path className="botanical-route-line" d="M150 670C320 735 635 570 800 630" stroke="#6385b8" strokeWidth="1.5" strokeDasharray="4 9" />
      <path className="botanical-route-edge" pathLength="1" d="M151 642C336 732 600 569 849 619" stroke="#b4c8e1" strokeWidth="1.5" />
      <g stroke="#183caa" strokeWidth="2" strokeLinecap="round">
        <path d="M559 586Q582 482 660 520M560 587Q552 505 610 540M558 588Q528 500 525 520M559 588Q523 496 510 520" />
        <path d="M680 582Q733 430 751 387M679 581Q751 505 765 510" />
      </g>
      <use href="#botanical-palm" transform="translate(732 535) rotate(12) scale(1.5)" color="#a8c2eb" />
      <use href="#botanical-heart" transform="translate(518 526) rotate(-64) scale(1.35)" color="#a8c2eb" />
      <use href="#botanical-heart" transform="translate(544 522) rotate(-25) scale(1.4)" color="#d7ed91" />
      <use href="#botanical-split" transform="translate(645 527) rotate(26) scale(1.85)" color="#214ce8" />
      <use href="#botanical-split" transform="translate(599 549) rotate(-36) scale(1.5)" color="#315cce" />
      <use href="#botanical-heart" transform="translate(682 564) rotate(65) scale(1.05)" color="#183caa" />
      <path d="M457 550H710L694 613H474Z" fill="#f7f9f7" stroke="#152344" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M453 549H714V560H453Z" fill="#c8d9ed" stroke="#152344" strokeWidth="1.4" />
      <path d="M485 570L493 601M501 570L507 601" stroke="#d0deed" strokeWidth="1.3" />
      <g stroke="#183caa" strokeWidth="1.8">
        <path d="M260 548Q238 493 221 466M260 548Q260 500 282 476M260 548Q290 506 312 502" />
      </g>
      <use href="#botanical-heart" transform="translate(238 498) rotate(-37) scale(.85)" color="#315cce" />
      <use href="#botanical-heart" transform="translate(269 508) rotate(19) scale(.72)" color="#a8c2eb" />
      <use href="#botanical-heart" transform="translate(298 525) rotate(61) scale(.68)" color="#214ce8" />
      <path d="M208 539H314L303 598H222Z" fill="#d9e5f0" stroke="#152344" strokeWidth="1.4" />
      <path d="M204 536H318V547H204Z" fill="#f7f9f7" stroke="#152344" strokeWidth="1.4" />
    </g>

    {character ? <g data-botanical-actor="true" pointerEvents="none">{character}</g> : null}
    <g data-botanical-layer="front">
      <path d="M70 747Q80 665 130 611M72 748Q96 695 185 677M72 749Q61 693 34 670" stroke="#183caa" strokeWidth="2" />
      <use href="#botanical-heart" transform="translate(88 713) rotate(31) scale(.7)" color="#183caa" />
      <use href="#botanical-heart" transform="translate(86 737) rotate(74) scale(.75)" color="#315cce" />
      <use href="#botanical-heart" transform="translate(64 744) rotate(-32) scale(.66)" color="#a8c2eb" />
      <use href="#botanical-palm" transform="translate(839 755) rotate(-20) scale(1.08)" color="#183caa" />
      <use href="#botanical-heart" transform="translate(830 755) rotate(-51) scale(.79)" color="#315cce" />
      <path d="M94 754Q376 781 703 729M740 725L798 716" stroke="#bacce2" strokeWidth="1.3" strokeLinecap="round" />
    </g>
  </svg>;
}
