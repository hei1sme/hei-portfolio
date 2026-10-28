import type { ReactNode } from "react";

// Photo-inspired, authored vector illustration. Plants and the path are artistic
// additions. Screen contents are decorative, never experimental results.
export default function WorkspaceDrawing({ character }: { character?: ReactNode }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800" fill="none" aria-hidden="true" className="botanical-drawing workspace-drawing">
    <defs>
      <clipPath id="botanical-duck-crop"><rect x="0" y="3.72" width="124" height="120.28" /></clipPath>
      <g id="workspace-leaf">
        <path d="M0 0C-32-8-62-39-51-70C-42-96-15-105 0-133C22-110 53-92 53-61C53-26 23-4 0 0Z" fill="currentColor" stroke="#152344" strokeWidth="1.3" />
        <path d="M0-2V-125M0-28L-31-52M0-56L-32-79M0-80L-18-98M0-29L32-56M0-56L31-81M0-82L19-101" stroke="#152344" strokeWidth=".8" opacity=".55" />
      </g>
      <g id="workspace-split-leaf">
        <path fillRule="evenodd" d="M0 0C-24 2-49-11-52-32C-55-48-29-37-19-48C-30-55-59-45-59-63C-60-80-34-84-15-84C-23-97-47-85-47-104C-45-121-15-132 1-155C17-137 40-130 43-115C46-103 22-107 15-96C29-95 51-108 54-92C57-73 30-68 16-63C28-56 55-64 55-46C55-20 23-2 0 0ZM-20-32A5 9-20 1 0-16-49A5 9-20 1 0-20-32ZM19-73A4 8 22 1 0 13-87A4 8 22 1 0 19-73Z" fill="currentColor" stroke="#152344" strokeWidth="1.4" />
        <path d="M0-2Q-5-80 1-149M-2-30Q-22-33-36-29M-3-62Q-23-74-42-68M-3-96Q-21-109-34-107M-2-29Q20-37 40-42M-2-65Q24-76 39-86M0-105Q16-120 28-122" stroke="#152344" strokeWidth=".85" opacity=".6" />
      </g>
    </defs>

    <g data-botanical-layer="back">
      {/* A quiet patch of daylight frames the desk without another UI frame. */}
      <path d="M230 132C420 72 724 136 815 286C858 360 822 443 768 485L189 453C106 349 122 209 230 132Z" fill="#e1eaf3" />
      <path d="M204 198L696 116M175 231L735 137" stroke="#f7f9fb" strokeWidth="15" />
      <path d="M110 454Q106 346 143 289M111 453Q62 369 52 349M112 449Q163 363 190 359" stroke="#315cce" strokeWidth="2" />
      <use href="#workspace-leaf" transform="translate(124 370) rotate(23) scale(.8)" color="#a8c2eb" />
      <use href="#workspace-leaf" transform="translate(105 413) rotate(-43) scale(.82)" color="#315cce" />
      <use href="#workspace-leaf" transform="translate(134 419) rotate(59) scale(.7)" color="#d7ed91" />
      <path d="M75 433H153L144 493H85Z" fill="#f7f9fb" stroke="#152344" strokeWidth="1.4" />
      <path d="M72 431H156V440H72Z" fill="#d0deed" stroke="#152344" strokeWidth="1.4" />

      {/* Monitor angle and the left-hand laptop echo the owner's photograph. */}
      <g transform="matrix(1 .08 -.045 1 369 160)">
        <path d="M12-19H351Q356-19 356-14V-2H7V-14Q7-19 12-19Z" fill="#152344" />
        <path d="M20-4H342" stroke="#a8c2eb" strokeWidth="2.5" />
        <path d="M-7 0H400V270H-7Z" fill="#315cce" stroke="#152344" strokeWidth="1.8" />
        <path d="M1 8H392V252H1Z" fill="#f7f9fb" stroke="#152344" strokeWidth="1.2" />
        <path d="M1 8H392V29H1Z" fill="#d2dff1" />
        {[12,23,34].map(x => <circle key={x} cx={x} cy="18" r="2" fill="#829ac1" />)}
        <path d="M64 18H163M332 18H375" stroke="#829ac1" strokeWidth="2" strokeLinecap="round" />
        <path d="M109 30V251" stroke="#b2c4de" />
        <g stroke="#99afd1" strokeWidth="2" strokeLinecap="round">
          {[48,60,72,84,107,119,131,143,166,178,190,202,225,237].map((y,i) => <path key={y} d={`M15 ${y}h${i%3===0 ? 66 : i%3===1 ? 78 : 57}`} />)}
        </g>
        <text x="130" y="62" fill="#152344" fontFamily="sans-serif" fontSize="20" letterSpacing="-.8">SmokeNet</text>
        <path d="M131 75H312" stroke="#b2c4de" strokeWidth="2" />
        <g stroke="#152344" strokeWidth="1.1" strokeLinejoin="round">
          <rect x="131" y="98" width="61" height="41" rx="5" fill="#dce7ef" />
          <rect x="223" y="98" width="61" height="41" rx="5" fill="#d7ed91" />
          <rect x="314" y="98" width="61" height="41" rx="5" fill="#d2dff1" />
          <path d="M193 119H222M216 115L222 119L216 123M285 119H313M307 115L313 119L307 123" />
        </g>
        <g stroke="#315cce" strokeWidth="1.4" strokeLinecap="round">
          <path d="M144 111H178M144 118H173M144 125H179M238 111V128M247 114V128M256 107V128M265 117V128M327 122L336 111L345 121L362 108" />
        </g>
        <path d="M254 140V161H188V177M248 155L254 161L260 155" stroke="#829ac1" strokeWidth="1.2" />
        <rect x="131" y="179" width="244" height="49" rx="5" fill="#e7edf5" stroke="#829ac1" />
        <path d="M145 193H231M145 203H292M145 213H269" stroke="#829ac1" strokeWidth="2" strokeLinecap="round" />
        <circle cx="340" cy="203" r="13" fill="#214ce8" />
        <path d="M333 204L338 209L348 197" stroke="#f7f9fb" strokeWidth="1.6" />
        <path d="M173 270L161 345H241L220 270Z" fill="#b3c8e7" stroke="#152344" strokeWidth="1.5" />
        <path d="M161 329L129 347L132 354H269L268 347L241 329" fill="#d2dff1" stroke="#152344" strokeWidth="1.5" />
      </g>
    </g>

    <g data-botanical-layer="middle">
      {/* The broad desktop is the main cobalt plane, not a floating device icon. */}
      <path d="M113 469L720 461L849 622L225 672Z" fill="#214ce8" stroke="#152344" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M225 672L849 622V639L225 692L113 488V469Z" fill="#183caa" stroke="#152344" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M242 690L216 747H233L266 688M806 644L831 714H817L780 647" fill="#152344" />
      <path d="M144 486L243 648M736 485L817 605" stroke="#6385e8" strokeWidth="1.2" />

      <g transform="matrix(.96 -.06 .075 1 143 295)">
        <path d="M0 0H241V195H0Z" fill="#152344" stroke="#152344" strokeWidth="1.8" />
        <path d="M8 9H233V179H8Z" fill="#dce7ef" />
        <path d="M8 9H233V26H8Z" fill="#a8c2eb" />
        <path d="M20 17H57M168 17H218" stroke="#315cce" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M38 26V178" stroke="#b2c4de" />
        {[43,61,79,97,115,133,151].map((y,i)=><g key={y} strokeWidth="3" strokeLinecap="round"><path d={`M51 ${y}h${i%2 ? 28 : 40}`} stroke="#315cce" /><path d={`M${i%2 ? 91 : 103} ${y}h${i%3 ? 77 : 51}`} stroke={i%3===1 ? "#829ac1" : "#557cc1"} /></g>)}
        <path d="M0 195H241L276 250L18 263L-9 249Z" fill="#b3c8e7" stroke="#152344" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M-9 249L18 263L276 250V257L18 271L-9 256Z" fill="#315cce" stroke="#152344" strokeWidth="1.3" />
        <path d="M15 204H230L250 237L30 246Z" fill="#183caa" stroke="#152344" />
        {[0,1,2,3].map(row=><g key={row} transform={`matrix(1 -.04 .5 .7 ${20+row*4} ${208+row*8})`}>
          {Array.from({length:13},(_,i)=><rect key={i} x={i*16} width="12" height="7" rx="1" fill={i%5===0 ? "#d7ed91" : "#a8c2eb"} />)}
        </g>)}
        <path d="M93 246L156 242L164 255L101 259Z" fill="#d2dff1" stroke="#829ac1" />
      </g>

      {/* External mechanical keyboard; individual keycaps keep the personal detail. */}
      <g transform="matrix(1 .12 -.38 .8 423 549)">
        <rect x="0" y="0" width="253" height="90" rx="7" fill="#152344" stroke="#152344" strokeWidth="1.5" />
        <rect x="0" y="-7" width="253" height="90" rx="7" fill="#b3c8e7" stroke="#152344" strokeWidth="1.5" />
        {[0,1,2,3].map(row=><g key={row}>
          {Array.from({length:13},(_,i)=><g key={i} transform={`translate(${8+i*18.1} ${row*17.5})`}>
            <rect width="15" height="14" rx="2.2" fill={(row===0&&i===0)||(row===2&&i===12) ? "#d7ed91" : i>9 ? "#315cce" : "#f7f9fb"} stroke="#152344" strokeWidth=".8" />
            <path d="M4 4H8" stroke={i>9 ? "#a8c2eb" : "#829ac1"} strokeWidth=".8" />
          </g>)}
        </g>)}
        <rect x="62" y="70" width="126" height="8" rx="2" fill="#f7f9fb" stroke="#152344" strokeWidth=".8" />
      </g>
      <g transform="translate(-45 -10)">
        <path d="M739 564C720 561 708 573 711 593L718 610C725 620 751 613 757 605C765 589 755 568 739 564Z" fill="#dce7ef" stroke="#152344" strokeWidth="1.6" />
        <path d="M739 565L739 585M736 573L741 573" stroke="#315cce" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <path d="M196 534V474C196 457 149 457 149 474V534C150 550 195 550 196 534Z" fill="#d7ed91" stroke="#152344" strokeWidth="1.5" />
      <ellipse cx="172.5" cy="474" rx="23.5" ry="8.5" fill="#f7f9fb" stroke="#152344" strokeWidth="1.5" />
      <ellipse cx="172.5" cy="474" rx="17.5" ry="5" fill="#152344" />
      <path d="M157 489V527" stroke="#f7f9fb" strokeWidth="2" strokeLinecap="round" />
      <path d="M572 510L584 462L621 465L626 515Z" fill="#d7ed91" stroke="#152344" strokeWidth="1.4" />
      <path d="M566 514H632V523H566Z" fill="#a8c2eb" stroke="#152344" strokeWidth="1.4" />
      <path d="M591 478L613 480M588 486L609 488M587 494L600 495" stroke="#829a71" strokeWidth="1.1" />

      {/* A lower route keeps the runner on the floor, clear of the desktop. */}
      <path d="M140 702C324 773 635 666 860 696L870 755C620 724 320 818 123 766Z" fill="#dce7ef" />
      <path d="M150 716C320 777 635 680 845 715" stroke="#6385b8" strokeWidth="1.5" strokeDasharray="4 9" />
      <path className="botanical-route-edge" pathLength="1" d="M140 702C324 773 635 666 860 696" stroke="#b4c8e1" strokeWidth="1.5" />
    </g>

    {character ? <g data-botanical-actor="true" pointerEvents="none">{character}</g> : null}

    <g data-botanical-layer="front">
      <path d="M797 619Q768 435 819 293M797 615Q821 494 862 462M795 615Q760 521 732 502" stroke="#183caa" strokeWidth="2.2" />
      <use href="#workspace-leaf" transform="translate(807 424) rotate(34) scale(.9)" color="#a8c2eb" />
      <use href="#workspace-leaf" transform="translate(786 482) rotate(-39) scale(.95)" color="#d7ed91" />
      <use href="#workspace-split-leaf" transform="translate(817 521) rotate(42) scale(1.1)" color="#214ce8" />
      <use href="#workspace-split-leaf" transform="translate(780 558) rotate(-47) scale(1.05)" color="#315cce" />
      <path d="M753 595H844L831 675H767Z" fill="#d2dff1" stroke="#152344" strokeWidth="1.5" />
      <path d="M748 591H849V603H748Z" fill="#f7f9fb" stroke="#152344" strokeWidth="1.4" />
      <path d="M778 616L782 660M790 616L792 660" stroke="#a8c2eb" strokeWidth="1.2" />
      <path d="M83 746Q87 702 121 672M85 745Q68 700 48 690" stroke="#315cce" strokeWidth="2" />
      <use href="#workspace-leaf" transform="translate(87 733) rotate(-44) scale(.65)" color="#a8c2eb" />
      <use href="#workspace-leaf" transform="translate(96 724) rotate(38) scale(.6)" color="#214ce8" />
      <path d="M216 791C402 816 616 752 769 776" stroke="#b4c8e1" strokeWidth="1.3" />
    </g>
  </svg>;
}
