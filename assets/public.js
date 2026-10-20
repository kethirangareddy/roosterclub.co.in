/* Rooster Club public pages: /u/<handle> (breeder storefront), /v/<code> (sale certificate),
   /c/<code> (School certificate). Shared by 404.html and every generated u/<handle>/index.html. */
(function(){
const SB='https://tsjiazashtxoybyaknec.supabase.co';
const KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzamlhemFzaHR4b3lieWFrbmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3MjEzNjEsImV4cCI6MjA5NjI5NzM2MX0.ztjN1Hp59ofJ8ZWVfyqbl81rzr-ha2pE3ceb8fqDD9U';
const PKG='in.co.roosterclub.app';
const app=document.getElementById('app');
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>'₹'+Number(n||0).toLocaleString('en-IN');
const safeUrl=u=>/^https:\/\//i.test(String(u||''))?String(u):'';

// Referral code carried on a shared link: /u/<handle>?c=CODE
const params=new URLSearchParams(location.search);
const REF=((params.get('c')||params.get('code')||'').trim().replace(/[^A-Za-z0-9_-]/g,'')).slice(0,24);
const STORE='https://play.google.com/store/apps/details?id='+PKG+(REF?('&referrer='+encodeURIComponent('code='+REF)):'');

async function rpc(fn,body){
  const r=await fetch(SB+'/rest/v1/rpc/'+fn,{method:'POST',headers:{apikey:KEY,Authorization:'Bearer '+KEY,'Content-Type':'application/json'},body:JSON.stringify(body)});
  if(!r.ok) throw new Error('http '+r.status);
  return r.json();
}
const BADGES={founding_member:'Founding member',bronze:'Bronze medal',silver:'Silver medal',gold_star:'Gold medal',legendary:'Legendary'};
const LEVELS={beginner:'Beginner',expert:'Expert',master:'Master'};
function fmtDate(s){try{return new Date(s).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}catch(e){return''}}
function yearOf(s){try{return new Date(s).getFullYear()}catch(e){return''}}

function toast(t){var el=document.createElement('div');el.className='toast';el.textContent=t;document.body.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));setTimeout(()=>{el.classList.remove('on');setTimeout(()=>el.remove(),300)},1800);}

function notFound(msg){
  var c=document.getElementById('ctas'); if(c) c.style.display='none';
  app.innerHTML='<div class="card center"><div class="big">\u{1F414}</div><h1>'+(msg||'Page not found')+'</h1><p class="muted">This link doesn’t point to a Rooster Club profile or certificate.</p></div>';
}

function renderProfile(p,listings){
  if(!p){ notFound('Breeder not found'); return; }
  const nameRaw=p.farm_name||p.full_name||'Rooster Club breeder';
  const name=esc(nameRaw);
  document.title=nameRaw+' · Rooster Club';
  const loc=[p.district,p.state].filter(Boolean).map(esc).join(', ');
  const cover=safeUrl(p.cover_url);
  const av=safeUrl(p.avatar_url);
  const listCount=Number(p.listing_count||0), sales=Number(p.sales_count||0);
  const since=p.established_year||yearOf(p.joined);

  const chips=[];
  if(p.badge&&BADGES[p.badge]) chips.push('<span class="chip">\u{1F3C5} '+esc(BADGES[p.badge])+'</span>');
  if(p.verified) chips.push('<span class="chip green">✓ ID-verified</span>');
  if(sales>0) chips.push('<span class="chip green">✅ '+sales+' verified sale'+(sales===1?'':'s')+'</span>');
  if(p.established_year) chips.push('<span class="chip">\u{1F4C5} Since '+esc(p.established_year)+'</span>');

  let tiles='';
  (listings||[]).forEach(l=>{
    const src=safeUrl(l.photo);
    const ph=src?'<img loading="lazy" src="'+esc(src)+'" alt="'+esc(l.breed||'')+'">':'<div class="ph">\u{1F414}</div>';
    tiles+='<div class="tile">'+ph+(l.is_video?'<span class="vid">▶ video</span>':'')+'<span class="pr">'+money(l.price)+'</span></div>';
  });
  const specs=(p.specialties||[]).map(s=>'<span class="chip plain">'+esc(s)+'</span>').join('');

  app.innerHTML=
    '<div class="card store">'+
      '<div class="cover"'+(cover?' style="background-image:url(\''+esc(cover)+'\')"':'')+'></div>'+
      '<div class="body">'+
        (av?'<img class="avatar" src="'+esc(av)+'" alt="">':'<div class="avatar">\u{1F414}</div>')+
        '<h1>'+name+'</h1>'+
        (p.handle?'<div class="handle">@'+esc(p.handle)+'</div>':'')+
        (loc?'<p class="muted center" style="margin:6px 0 0">\u{1F4CD} '+loc+'</p>':'')+
        (chips.length?'<div class="chips">'+chips.join('')+'</div>':'')+
        '<div class="stats">'+
          '<div><b>'+listCount+'</b><span>Birds for sale</span></div>'+
          '<div><b>'+sales+'</b><span>Verified sales</span></div>'+
          '<div><b>'+esc(since||'—')+'</b><span>'+(p.established_year?'Breeding since':'Member since')+'</span></div>'+
        '</div>'+
        (p.farm_story?'<h2>Our farm</h2><p class="story">'+esc(p.farm_story)+'</p>':(p.bio?'<p class="story center" style="margin-top:14px">'+esc(p.bio)+'</p>':''))+
        (specs?'<h2>Specialties</h2><div class="chips" style="justify-content:flex-start">'+specs+'</div>':'')+
        (tiles?'<h2>Birds for sale</h2><div class="grid">'+tiles+'</div>':'<p class="muted center" style="margin-top:16px">No birds listed right now — follow in the app to get notified.</p>')+
      '</div>'+
    '</div>'+
    (REF?'<div class="invite">\u{1F381} You were invited to Rooster Club. Code <b>'+esc(REF)+'</b> will be filled in when you join.</div>':'');
  const share=document.getElementById('shareweb'); if(share) share.style.display='block';
}

function renderVerify(r){
  if(!r){ notFound('Certificate not found'); return; }
  const src=safeUrl(r.photo);
  const ph=src?'<div class="center"><img src="'+esc(src)+'" alt="" style="width:120px;height:120px;object-fit:cover;border-radius:14px;border:1px solid var(--line)"></div>':'';
  const breedRing=[r.breed?esc(r.breed):'',r.ring_no?'ring '+esc(r.ring_no):''].filter(Boolean).join(' · ');
  app.innerHTML=
    '<div class="card">'+
    '<div class="seal">✓</div>'+
    '<h1>Verified sale</h1>'+
    '<p class="center muted" style="margin:2px 0 14px">This is a genuine Rooster Club sale certificate.</p>'+
    ph+
    '<div style="margin-top:14px">'+
      '<div class="row"><span class="k">Item</span><span class="v">'+esc(r.item||'Bird')+'</span></div>'+
      (breedRing?'<div class="row"><span class="k">Breed</span><span class="v">'+breedRing+'</span></div>':'')+
      '<div class="row"><span class="k">Sold by</span><span class="v">'+esc(r.seller||'Seller')+(r.seller_verified?' <span class="tick">✓</span>':'')+'</span></div>'+
      (r.buyer_first?'<div class="row"><span class="k">Sold to</span><span class="v">'+esc(r.buyer_first)+'</span></div>':'')+
      '<div class="row"><span class="k">Amount</span><span class="v">'+money(r.price)+'</span></div>'+
      '<div class="row"><span class="k">Date</span><span class="v">'+fmtDate(r.issued_at)+'</span></div>'+
      '<div class="row"><span class="k">Certificate</span><span class="v" style="font-family:monospace">'+esc(r.receipt_no||'')+'</span></div>'+
      '<div class="row"><span class="k">Status</span><span class="v tick">'+(r.status==='acknowledged'?'Buyer-accepted':'Issued')+'</span></div>'+
    '</div></div>';
}

function renderCert(c){
  if(!c){ notFound('Certificate not found'); return; }
  app.innerHTML=
    '<div class="card">'+
    '<div class="seal">✓</div>'+
    '<h1>Rooster Club School certificate</h1>'+
    '<p class="center muted" style="margin:2px 0 14px">This is a genuine certificate issued by Rooster Club School.</p>'+
    '<div style="margin-top:14px">'+
      '<div class="row"><span class="k">Name</span><span class="v">'+esc(c.name||'')+'</span></div>'+
      '<div class="row"><span class="k">Level</span><span class="v">'+esc(LEVELS[c.level]||c.level)+'</span></div>'+
      (c.district?'<div class="row"><span class="k">District</span><span class="v">'+esc(c.district)+'</span></div>':'')+
      '<div class="row"><span class="k">Chapters passed</span><span class="v">'+Number(c.chapters_passed||0)+' of '+Number(c.chapters_total||0)+'</span></div>'+
      '<div class="row"><span class="k">Issued</span><span class="v">'+fmtDate(c.issued_at)+'</span></div>'+
      '<div class="row"><span class="k">Certificate</span><span class="v" style="font-family:monospace">'+esc(decodeURIComponent(location.pathname.split('/')[2]||''))+'</span></div>'+
    '</div></div>';
}

async function route(){
  const m=location.pathname.match(/^\/(u|v|c)\/(.+?)\/?$/);
  if(!m){ notFound(); return; }
  const kind=m[1], key=decodeURIComponent(m[2]);
  try{
    if(kind==='u'){
      const [p,ls]=await Promise.all([rpc('public_profile_by_handle',{p_handle:key}),rpc('public_listings_by_handle',{p_handle:key})]);
      renderProfile(p,ls);
    }else if(kind==='c'){
      renderCert(await rpc('verify_certificate',{p_cert:key}));
    }else{
      renderVerify(await rpc('verify_receipt_by_code',{p_code:key}));
    }
  }catch(e){ app.innerHTML='<div class="card center muted">Couldn’t load this right now. Please try again.</div>'; }
}

// Buttons: open in app (deep link, Play Store fallback), get the app, share this page.
(function(){
  var get=document.getElementById('getapp'); if(get) get.href=STORE;
  var btn=document.getElementById('openapp');
  if(btn) btn.addEventListener('click',function(e){
    e.preventDefault();
    var deep='roosterclub://'+location.pathname.replace(/^\/+|\/+$/g,'')+(REF?('?c='+encodeURIComponent(REF)):'');
    var fell=false;
    var t=setTimeout(function(){ if(!fell) window.location=STORE; },1300);
    document.addEventListener('visibilitychange',function(){ if(document.hidden){ fell=true; clearTimeout(t); } },{once:true});
    window.location=deep;
  });
  var sh=document.getElementById('shareweb');
  if(sh) sh.addEventListener('click',async function(e){
    e.preventDefault();
    var url=location.origin+location.pathname.replace(/\/+$/,'')+(REF?('?c='+encodeURIComponent(REF)):'');
    var text=document.title.replace(/ · Rooster Club$/,'')+' on Rooster Club \u{1F413}';
    try{ if(navigator.share){ await navigator.share({title:document.title,text:text,url:url}); return; } }catch(_){ return; }
    window.location='https://wa.me/?text='+encodeURIComponent(text+'\n'+url);
  });
})();

route();
})();
