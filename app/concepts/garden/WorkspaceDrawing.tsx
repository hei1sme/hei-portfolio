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
      <g id="workspace-frond">
        <path d="M0 0Q-24-130 16-267" stroke="currentColor" strokeWidth="2.5" />
        {[0,1,2,3,4,5,6].map(i => {
          const y = -26-i*30, x = i>3 ? (i-3)*3 : -5;
          return <g key={i}>
            <path d={`M${x} ${y}Q${x-69+i*5} ${y-8} ${x-82+i*7} ${y-55}Q${x-30} ${y-45} ${x} ${y}Z`} fill="currentColor" />
            <path d={`M${x} ${y-9}Q${x+67-i*5} ${y-25} ${x+76-i*6} ${y-65}Q${x+27} ${y-44} ${x} ${y-9}Z`} fill="currentColor" />
          </g>;
        })}
      </g>
    </defs>

    <g data-botanical-layer="back">
      {/* Distant canopy surrounds an open, lighter clearing behind the screens. */}
      <path d="M94 521C52 365 96 192 220 116C373 25 638 41 794 145C900 214 934 416 881 538Z" fill="#e1eaf3" />
      <g stroke="#b3c8e1" strokeWidth="2.5" fill="none">
        <path d="M159 517Q92 277 183 88M240 484Q205 257 294 76M742 498Q803 254 739 85M839 532Q915 304 843 132" />
      </g>
      <g color="#c5d8e9">
        <use href="#workspace-frond" transform="translate(240 381) rotate(-25) scale(1.18)" />
        <use href="#workspace-frond" transform="translate(353 306) rotate(-27) scale(.95)" />
        <use href="#workspace-frond" transform="translate(622 305) rotate(32) scale(.92)" />
        <use href="#workspace-frond" transform="translate(775 392) rotate(27) scale(1.14)" />
      </g>
      <use href="#workspace-leaf" transform="translate(248 243) rotate(-27) scale(1.3)" color="#d2e0ef" />
      <use href="#workspace-leaf" transform="translate(423 179) rotate(54) scale(1.05)" color="#d7e6d1" />
      <use href="#workspace-leaf" transform="translate(617 168) rotate(-48) scale(1.05)" color="#d2e0ef" />
      <use href="#workspace-leaf" transform="translate(775 289) rotate(28) scale(1.45)" color="#d7e6d1" />
      <g stroke="#789bc5" strokeWidth="2.2">
        <path d="M115 585Q97 369 174 183M116 583Q55 413 65 328M118 578Q215 427 222 350" />
        <path d="M842 581Q893 357 811 185M847 583Q941 421 935 328" />
      </g>
      <use href="#workspace-leaf" transform="translate(150 330) rotate(20) scale(1.18)" color="#a8c2eb" />
      <use href="#workspace-split-leaf" transform="translate(155 430) rotate(-28) scale(1.1)" color="#799ed3" />
      <use href="#workspace-leaf" transform="translate(190 463) rotate(49) scale(.95)" color="#d7ed91" />
      <use href="#workspace-split-leaf" transform="translate(842 355) rotate(-22) scale(1.3)" color="#a8c2eb" />
      <use href="#workspace-leaf" transform="translate(855 460) rotate(34) scale(1.12)" color="#799ed3" />
      <use href="#workspace-frond" transform="translate(800 564) rotate(35) scale(.85)" color="#315cce" />
      <use href="#workspace-frond" transform="translate(167 567) rotate(-25) scale(.8)" color="#315cce" />
    </g>

    <g data-botanical-layer="middle">
      {/* Every object shares this rigid layer and the same supporting desktop. */}
      <g data-workspace-item="desk">
        <path d="M135 471L116 679H130L157 470M711 455L753 668H767L735 454" fill="#315cce" stroke="#152344" strokeWidth="1.5" />
        <path d="M244 655L216 749H234L266 654M822 630L851 723H834L799 631" fill="#152344" />
        <path d="M113 455L733 433.3L850 620.5L230 642.2Z" fill="#214ce8" stroke="#152344" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M113 455L230 642.2V659.2L113 472Z" fill="#315cce" stroke="#152344" strokeWidth="1.5" />
        <path d="M230 642.2L850 620.5V637.5L230 659.2Z" fill="#183caa" stroke="#152344" strokeWidth="1.5" />
        <path d="M132 466L242 628L831 607" stroke="#6385e8" strokeWidth="1.1" />
      </g>

      {/* Monitor angle and the left-hand laptop echo the owner's photograph. */}
      <g data-workspace-item="monitor" transform="matrix(1 .08 -.045 1 369 160)">
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
      <g data-workspace-item="laptop" transform="matrix(.96 -.06 .075 1 143 295)">
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
      <g data-workspace-item="keyboard" transform="matrix(1 -.035 .45 .72 448.25 549.95)">
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
      <g data-workspace-item="mouse" transform="matrix(1 -.035 .45 .72 731.75 556.75)">
        <path d="M0 24C0 8 7 0 20 0C34 0 41 9 41 24V42C41 60 0 60 0 42Z" fill="#dce7ef" stroke="#152344" strokeWidth="1.6" />
        <path d="M20 2V24M17 12H23" stroke="#315cce" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g data-workspace-item="tumbler" transform="translate(97.5 62)">
      <path d="M196 534V474C196 457 149 457 149 474V534C150 550 195 550 196 534Z" fill="#d7ed91" stroke="#152344" strokeWidth="1.5" />
      <ellipse cx="172.5" cy="474" rx="23.5" ry="8.5" fill="#f7f9fb" stroke="#152344" strokeWidth="1.5" />
      <ellipse cx="172.5" cy="474" rx="17.5" ry="5" fill="#152344" />
      <path d="M157 489V527" stroke="#f7f9fb" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g data-workspace-item="phone-stand" transform="translate(108 -14)">
      <path d="M572 510L584 462L621 465L626 515Z" fill="#d7ed91" stroke="#152344" strokeWidth="1.4" />
      <path d="M566 514H632V523H566Z" fill="#a8c2eb" stroke="#152344" strokeWidth="1.4" />
      <path d="M591 478L613 480M588 486L609 488M587 494L600 495" stroke="#829a71" strokeWidth="1.1" />
      </g>

      {/* A lower route keeps the runner on the floor, clear of the desktop. */}
      <path d="M140 702C324 773 635 666 860 696L870 755C620 724 320 818 123 766Z" fill="#dce7ef" />
      <path d="M150 716C320 777 635 680 845 715" stroke="#6385b8" strokeWidth="1.5" strokeDasharray="4 9" />
      <path className="botanical-route-edge" pathLength="1" d="M140 702C324 773 635 666 860 696" stroke="#b4c8e1" strokeWidth="1.5" />
    </g>

    {character ? <g data-botanical-actor="true" pointerEvents="none">{character}</g> : null}

    <g data-botanical-layer="front">
      <g data-workspace-item="floor-plant">
        <path d="M910 672Q875 488 916 357M910 669Q945 555 957 510M909 668Q869 579 856 555" stroke="#183caa" strokeWidth="2.2" />
        <use href="#workspace-leaf" transform="translate(914 467) rotate(19) scale(.82)" color="#a8c2eb" />
        <use href="#workspace-leaf" transform="translate(899 527) rotate(-28) scale(.78)" color="#d7ed91" />
        <use href="#workspace-split-leaf" transform="translate(904 578) rotate(18) scale(.82)" color="#214ce8" />
        <use href="#workspace-split-leaf" transform="translate(901 615) rotate(-29) scale(.75)" color="#315cce" />
        <path d="M870 666H953L942 737H883Z" fill="#d2dff1" stroke="#152344" strokeWidth="1.5" />
        <path d="M866 662H957V673H866Z" fill="#f7f9fb" stroke="#152344" strokeWidth="1.4" />
        <path d="M892 685L896 724M905 685L906 724" stroke="#a8c2eb" strokeWidth="1.2" />
      </g>
      <path d="M83 746Q87 702 121 672M85 745Q68 700 48 690" stroke="#315cce" strokeWidth="2" />
      <use href="#workspace-leaf" transform="translate(87 733) rotate(-44) scale(.65)" color="#a8c2eb" />
      <use href="#workspace-leaf" transform="translate(96 724) rotate(38) scale(.6)" color="#214ce8" />
      <path d="M216 791C402 816 616 752 769 776" stroke="#b4c8e1" strokeWidth="1.3" />
    </g>
  </svg>;
}
