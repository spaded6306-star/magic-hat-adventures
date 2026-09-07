/* Original files are untouched. Runtime masks remove border-connected baked backgrounds.
 * Gems are display crops of the supplied gem-in-chest PNGs; no replacement art is drawn. */
MHA.Assets={images:{},urls:{},originals:{},warnings:[]};
MHA.Assets.load=async function(progress){
 const a=this, paths={};
 ['player','magic_hat_girl','captain','parrot','first_mate','sailor_red','sailor_blue','sailor_green','sailor_yellow','sailor_purple','sailor_orange','crew'].forEach(k=>paths[k]='assets/characters/'+k+'.png');
 [...MHA.DATA.nouns,'treasure_chest','final_treasure',...MHA.DATA.gems].forEach(k=>paths[k]='assets/objects/'+k+'.png');
 paths.ship='assets/maps/pirate_ship.png';paths.map='assets/maps/treasure_map.png';
 let count=0;
 await Promise.all(Object.entries(paths).map(async([key,path])=>{
  const im=new Image();await new Promise((res,rej)=>{im.onload=res;im.onerror=()=>rej(new Error('Could not load '+path));im.src=path});a.originals[key]=im;
  if(key==='ship'){a.images[key]=im;a.urls[key]=path}else{
   const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(im,0,0);
   const gray=['player','captain','parrot','first_mate','sailor_red','sailor_blue','sailor_green','sailor_yellow','sailor_purple','sailor_orange','treasure_chest'].includes(key);
   const black=key==='final_treasure'||key==='map';
   if(gray||black){maskBorder(g,c.width,c.height,gray?'gray':'black');a.warnings.push(key+': runtime background mask; original unchanged')}
   const trimmed=trim(c);a.images[key]=trimmed;a.urls[key]=trimmed.toDataURL('image/png');
  }
  progress(++count,Object.keys(paths).length);
 }));
 MHA.DATA.gems.forEach((key,i)=>{
  const im=a.originals[key],c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(im,0,0);const data=g.getImageData(0,0,c.width,c.height),p=data.data;
  for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){
   const n=(y*c.width+x)*4,r=p[n],b=p[n+2],v=p[n+1];let keep=false;
   if(x>c.width*.30&&x<c.width*.70&&y>c.height*.31&&y<c.height*.60){
    const white=Math.min(r,v,b)>175;
    keep=white||[r>125&&r>v*1.8&&r>b*1.3,b>145&&b>r*1.4&&b>v*1.1,v>125&&v>r*1.4&&v>b*1.1,r>190&&v>160&&b<130&&y<c.height*.565,b>130&&b>r*1.1&&b>v*1.6,v>130&&b>150&&b>r*1.2,r>170&&b>140&&r>v*1.15&&b>v*1.1,b>150&&v>145&&b>r*1.1][i];
   }if(!keep)p[n+3]=0;
  }
  // Retain the main gemstone's bounds, excluding detached sparkle marks in the chest.
  const visited=new Uint8Array(c.width*c.height),queue=new Int32Array(visited.length);let largest=0,bounds=null;
  for(let n=0;n<visited.length;n++)if(!visited[n]&&p[n*4+3]){let head=0,tail=1,l=c.width,r=0,t=c.height,b=0;queue[0]=n;visited[n]=1;while(head<tail){const k=queue[head++],x=k%c.width,y=Math.floor(k/c.width);l=Math.min(l,x);r=Math.max(r,x);t=Math.min(t,y);b=Math.max(b,y);for(const next of [x?k-1:-1,x<c.width-1?k+1:-1,k-c.width,k+c.width])if(next>=0&&next<visited.length&&!visited[next]&&p[next*4+3]){visited[next]=1;queue[tail++]=next}}if(tail>largest){largest=tail;bounds=[l,t,r,b]}}
  if(bounds)for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++)if(x<bounds[0]||x>bounds[2]||y<bounds[1]||y>bounds[3])p[(y*c.width+x)*4+3]=0;
  g.putImageData(data,0,0);const jewel=trim(c);a.images['gem_'+key]=jewel;a.urls['gem_'+key]=jewel.toDataURL();
 });
 function maskBorder(g,w,h,mode){
  const data=g.getImageData(0,0,w,h),p=data.data,seen=new Uint8Array(w*h),q=new Int32Array(w*h);let head=0,tail=0;
  const okay=n=>{const i=n*4,r=p[i],v=p[i+1],b=p[i+2];return mode==='gray'?Math.min(r,v,b)>155&&Math.max(r,v,b)-Math.min(r,v,b)<33:Math.max(r,v,b)<42};
  function push(n){if(n<0||n>=seen.length||seen[n])return;seen[n]=1;if(okay(n))q[tail++]=n}
  for(let x=0;x<w;x++){push(x);push((h-1)*w+x)}for(let y=0;y<h;y++){push(y*w);push(y*w+w-1)}
  while(head<tail){const n=q[head++];p[n*4+3]=0;const x=n%w;if(x)push(n-1);if(x<w-1)push(n+1);push(n-w);push(n+w)}
  // Interior holes in the baked checkerboard: only remove gray pixels with alternating
  // gray/white neighbors. Warm white clothing and enclosed white artwork are preserved.
  if(mode==='gray')for(let y=12;y<h-12;y++)for(let x=12;x<w-12;x++){
   const n=y*w+x;if(seen[n]||!okay(n))continue;const i=n*4;
   if(Math.max(p[i],p[i+1],p[i+2])-Math.min(p[i],p[i+1],p[i+2])<8&&p[i]<225){
    let neighbors=0;for(const off of [-10,10,-w*10,w*10])if(okay(n+off))neighbors++;
    if(neighbors>=3)p[i+3]=0;
   }
  }
  g.putImageData(data,0,0);
 }
 function trim(c){const g=c.getContext('2d',{willReadFrequently:true}),p=g.getImageData(0,0,c.width,c.height).data;let l=c.width,t=c.height,r=0,b=0;for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++)if(p[(y*c.width+x)*4+3]>40){l=Math.min(l,x);r=Math.max(r,x);t=Math.min(t,y);b=Math.max(b,y)}if(r<l)return c;const o=document.createElement('canvas');o.width=r-l+1;o.height=b-t+1;o.getContext('2d').drawImage(c,l,t,o.width,o.height,0,0,o.width,o.height);return o}
};
