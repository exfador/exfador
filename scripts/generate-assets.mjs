// Self-contained animated SVGs. Run: node scripts/generate-assets.mjs
// No JavaScript or external resources inside images. Reduced-motion has a static fallback.
import {mkdir,writeFile} from 'node:fs/promises';
const root=new URL('../assets/',import.meta.url);
await mkdir(root,{recursive:true});
const ink='#171717',paper='#e8e5dd',red='#f33b24',dim='#8b8b89',line='#3b3c3d';
const text=(x,y,s,size=20,color=ink,weight=400,extra='')=>`<text x="${x}" y="${y}" fill="${color}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" ${extra}>${s}</text>`;
const mono=(x,y,s,size=16,color=dim,extra='')=>`<text x="${x}" y="${y}" fill="${color}" font-family="Consolas, monospace" font-size="${size}" ${extra}>${s}</text>`;
const css=`
@keyframes scan {0%,8%{transform:translateX(-240px)}70%,100%{transform:translateX(1450px)}}
@keyframes ticker {to{transform:translateX(-1280px)}}
@keyframes turn {0%,25%{transform:rotate(0deg)}50%,75%{transform:rotate(90deg)}100%{transform:rotate(180deg)}}
@keyframes stream {to{stroke-dashoffset:-120}}
@keyframes ping {0%,100%{opacity:.25}50%{opacity:1}}
@keyframes reveal {0%,8%{clip-path:inset(0 100% 0 0)}35%,85%{clip-path:inset(0 0 0 0)}100%{clip-path:inset(0 100% 0 0)}}
@keyframes arrow {0%,100%{transform:translate(0,0)}50%{transform:translate(8px,-8px)}}
.scan{animation:scan 7s ease-in-out infinite}
.ticker{animation:ticker 24s linear infinite}
.turn{transform-box:fill-box;transform-origin:center;animation:turn 6s ease-in-out infinite}
.stream{animation:stream 3s linear infinite}
.ping{animation:ping 3s ease-in-out infinite}
.reveal{animation:reveal 10s steps(28,end) infinite}
.arrow{animation:arrow 2.5s ease-in-out infinite}
@media(prefers-reduced-motion:reduce){*{animation:none!important}.scan{display:none}.reveal{clip-path:none}}
`;
const shell=(w,h,title,bg,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><title>${title}</title><style>${css}</style><rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>\n`;
const save=(name,body)=>writeFile(new URL(name,root),body);
function marquee(y,h){return `<rect y="${y}" width="1280" height="${h}" fill="${red}"/><g class="ticker">${[0,1280].map(x=>mono(x+32,y+h/2+8,'PYTHON / TELEGRAM / FASTAPI / REACT / API / AUTOMATION / COXERHUB /',23,ink,'textLength="1195" lengthAdjust="spacing"')).join('')}</g>`;}
for(const mobile of [false,true]){
 const w=mobile?640:1280,h=mobile?436:536;
 const word=mobile?text(17,212,'exfador',146,ink,900,'letter-spacing="-10" textLength="539" lengthAdjust="spacingAndGlyphs"'):text(22,298,'exfador',254,ink,900,'letter-spacing="-17" textLength="1047" lengthAdjust="spacingAndGlyphs"');
 const header=mobile?`${text(24,40,'COXERHUB',18,ink,700)}${mono(616,40,'UTC+3',18,ink,'text-anchor="end"')}<path d="M24 60H616" stroke="${ink}"/>`:`${text(34,47,'COXERHUB',19,ink,700)}${mono(1246,47,'Python-разработчик / UTC+3',18,ink,'text-anchor="end"')}<path d="M34 70H1246" stroke="${ink}"/>`;
 await save(mobile?'hero-mobile.svg':'hero.svg',shell(w,h,'exfador — Python, Telegram, API, Web',paper,`
 <defs><clipPath id="word">${word}</clipPath></defs>${header}${word}
 <g clip-path="url(#word)"><rect class="scan" x="0" y="70" width="180" height="250" fill="${red}"/></g>
 <rect class="turn" x="${mobile?580:1122}" y="${mobile?188:260}" width="${mobile?24:42}" height="${mobile?24:42}" fill="${red}"/>
 ${mobile?`<path d="M24 249H616" stroke="${ink}"/>${text(24,291,'Боты. API. Автоматизация.',25,ink,700)}${mono(24,334,'async def main():',22,ink,'class="reveal"')}`:`<path d="M34 347H1246" stroke="${ink}"/>${text(34,401,'Боты. API. Автоматизация.',27,ink,700)}${mono(1243,400,'async def main():',24,ink,'text-anchor="end" class="reveal"')}`}
 ${marquee(mobile?374:458,mobile?62:78)}
 `));
}
// Three independent marketplace projects; lines show their common Telegram interface.
function connector(d,delay=0){return `<path d="${d}" stroke="${line}" fill="none" stroke-width="2"/><path class="stream" style="animation-delay:${delay}s" d="${d}" stroke="${red}" fill="none" stroke-width="3" stroke-dasharray="14 46"/>`;}
function box(x,y,w,label,sub){return `<rect x="${x}" y="${y}" width="${w}" height="76" fill="#202123" stroke="${line}"/>${text(x+20,y+33,label,23,paper,700)}${mono(x+20,y+58,sub,13,dim)}`;}
await save('ecosystem.svg',shell(1280,450,'FunPay → CXH FP; Playerok → CXH Playerok; Starvell → Starvell Bot. Интерфейс каждого проекта — Telegram.',ink,`
 ${text(34,48,'МАГАЗИНЫ → TELEGRAM',24,paper,700)}${mono(1246,47,'три отдельных проекта',16,dim,'text-anchor="end"')}
 <path d="M34 73H1246" stroke="${line}"/>
 ${[126,236,346].map((y,i)=>connector(`M250 ${y+38}H400`,i*-1)+connector(`M710 ${y+38}H838V274H1000`,i*-1)).join('')}
 ${box(34,126,216,'FunPay','заказы / сообщения')}${box(400,126,310,'CXH FP','плагины / автовыдача')}
 ${box(34,236,216,'Playerok','сделки / события')}${box(400,236,310,'CXH Playerok','WebSocket / Telegram')}
 ${box(34,346,216,'Starvell','лоты / чаты')}${box(400,346,310,'Starvell Bot','автобамп / плагины')}
 <rect x="1000" y="210" width="246" height="128" fill="${paper}"/>
 ${text(1024,261,'Telegram',31,ink,700)}${mono(1024,293,'панель продавца',16,ink)}
 <circle cx="1214" cy="230" r="5" fill="${red}" class="ping"/>
`));
await save('ecosystem-mobile.svg',shell(640,536,'FunPay, Playerok и Starvell: три проекта с управлением через Telegram.',ink,`
 ${text(24,43,'МАГАЗИНЫ → TELEGRAM',23,paper,700)}${mono(24,74,'три отдельных проекта',16,dim)}
 ${[122,226,330].map((y,i)=>connector(`M196 ${y+35}H250`,i*-1)).join('')}
 ${text(24,166,'FunPay',25,paper,700)}${box(250,122,366,'CXH FP','плагины / автовыдача')}
 ${text(24,270,'Playerok',25,paper,700)}${box(250,226,366,'CXH Playerok','события / чаты / сделки')}
 ${text(24,374,'Starvell',25,paper,700)}${box(250,330,366,'Starvell Bot','автобамп / плагины')}
 ${connector('M433 406V448',-1)}<rect x="24" y="448" width="592" height="64" fill="${paper}"/>${text(44,489,'Управление через Telegram',26,ink,700)}
`));
const techs=[['PY','Python','asyncio · FastAPI'],['TG','Telegram','aiogram · Pyrogram'],['TS','Web','React · Next.js'],['DB','Данные','PostgreSQL · Redis'],['API','Интеграции','httpx · WebSocket'],['OPS','Сервер','Docker · Linux']];
function toolkit(mobile){const w=mobile?640:1280,cols=mobile?2:3,cw=mobile?320:426.66,rh=140,h=mobile?420:280;
return shell(w,h,'Стек: Python, Telegram, TypeScript, PostgreSQL, API, Docker.',ink,techs.map(([abbr,name,sub],i)=>{
 const x=(i%cols)*cw,y=Math.floor(i/cols)*rh;
 return `<rect x="${x+.5}" y="${y+.5}" width="${cw-1}" height="${rh-1}" fill="none" stroke="${line}"/>
 ${mono(x+20,y+34,abbr,16,red)}${text(x+20,y+75,name,29,paper,700)}${mono(x+20,y+112,sub,mobile?16:17,dim)}
 <path class="stream" style="animation-delay:${-i*.45}s" d="M${x+cw-75} ${y+31}H${x+cw-20}" stroke="${red}" stroke-width="2" stroke-dasharray="8 12"/>`;
}).join(''));}
await save('toolkit.svg',toolkit(false));await save('toolkit-mobile.svg',toolkit(true));
await save('contact.svg',shell(1280,174,'Написать exfador в Telegram — боты, интеграции, плагины.',red,`
 ${mono(32,39,'БОТЫ / ИНТЕГРАЦИИ / ПЛАГИНЫ',16,ink)}${text(28,127,'t.me/exfador',79,ink,800,'letter-spacing="-3"')}
 <g class="arrow"><path d="M1120 50H1210V140M1210 50L1120 140" fill="none" stroke="${ink}" stroke-width="9"/></g>
`));
console.log('Generated 7 animated SVG assets.');
