import fs from 'node:fs/promises';
import sharp from 'sharp';
const sites = [
 ['yalaride','https://yalaride.com/'],['ann','https://americaneedsnurses.com/'],
 ['dubai-tv-repair','http://dubaitvrepair.com/'],['oj-properties','https://oj-properties.com/'],
 ['al-awan','https://al-awanfurniture.com/'],['novamed','https://www.novamedaesthetics.com.au/'],
 ['rizitech','https://rizitech.com/'],['carscompound','https://carscompound.com/'],
 ['gojetter','https://go-jetter.com/'],['lahorecentre','https://www.lahorecentre.com/'],
 ['grow-dental','https://growdentalsupply.com/'],['georgia','https://georgianeedsnurses.com/'],
 ['caregivers','http://caregiversnearby.com/'],['drivekleen','http://drivekleen.com/'],
];
const report=[];
await fs.mkdir('public/images/portfolio',{recursive:true});
await Promise.all(sites.map(async ([id,url])=>{
 try {
  const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
  if(!response.ok) throw Error(`HTTP ${response.status}`);
  const html=await response.text();
  const candidates=[];
  for(const tag of html.matchAll(/<(?:img|meta)\b[^>]*>/gi)){
   const attrs=Object.fromEntries([...tag[0].matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m=>[m[1].toLowerCase(),m[2]]));
   const src=attrs['data-src']||attrs.src||(/(?:og:image|twitter:image)/.test(attrs.property||attrs.name||'')?attrs.content:null);
   if(src&&!src.startsWith('data:')) candidates.push({src,score:/hero|banner|slide|home|main/i.test(src+' '+(attrs.alt||''))?10:0});
  }
  for(const m of html.matchAll(/url\(["']?([^\s)'"<>]+)["']?\)/g)) candidates.push({src:m[1],score:/hero|banner/i.test(m[1])?12:0});
  candidates.sort((a,b)=>b.score-a.score);
  let best=null;
  for(const candidate of candidates.slice(0,22)){
   try{
    const source=new URL(candidate.src.replaceAll('&amp;','&'),response.url).href;
    if(/logo|icon|\.svg|\.gif|pixel|flag/i.test(source)) continue;
    const res=await fetch(source,{signal:AbortSignal.timeout(12000)});
    if(!res.ok) continue;
    const bytes=Buffer.from(await res.arrayBuffer());
    const meta=await sharp(bytes).metadata();
    if(meta.width<500||meta.height<220)continue;
    const score=candidate.score+Math.min(meta.width/200,10)+(meta.width>meta.height?5:0);
    if(!best||score>best.score)best={bytes,source,score};
    if(score>=20)break;
   }catch{}
  }
  if(!best)throw Error('No suitable source image');
  await sharp(best.bytes).resize(1400,1000,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(`public/images/portfolio/${id}.webp`);
  report.push({id,url,source:best.source});console.log(id,'saved');
 }catch(e){report.push({id,url,error:e.message});console.log(id,e.message);}
}));
await fs.writeFile('public/images/portfolio/sources.json',JSON.stringify(report,null,2));
