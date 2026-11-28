/* Rooster Club website shop (roosterclub.co.in/shop/).
   Sections: Accessories, Apparel (T-shirts: pick style/colour/size, paid online via CCAvenue only), Feed Supplements,
   Nutri Laddus, Feed. No BSF. Guest checkout, Cash on Delivery. Products and orders are the same
   ones the app uses (Supabase). Online payment goes through CCAvenue (edge function ccav-shop),
   shown only when app_config.shop_pay.ccav_enabled is true. Prices, stock and delivery are always worked out again
   on the server by web_place_shop_order — the numbers here are for display only. */
(function(){
const SB='https://tsjiazashtxoybyaknec.supabase.co';
const KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzamlhemFzaHR4b3lieWFrbmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3MjEzNjEsImV4cCI6MjA5NjI5NzM2MX0.ztjN1Hp59ofJ8ZWVfyqbl81rzr-ha2pE3ceb8fqDD9U';
const WA='919515369756';
const PAY_FN=SB+'/functions/v1/ccav-shop';
let ONLINE=null; // is online payment open (asked from the server)
const MAX_QTY=20, FREE_DELIVERY=999, DELIVERY_FEE=49;
const TEE_KEY='rc-web-tee-v1';
const CART_KEY='rc-web-cart-v1', ORDERS_KEY='rc-web-orders-v1', ADDR_KEY='rc-web-address-v1';
const STATES=['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry'];
const PLAY='https://play.google.com/store/apps/details?id=in.co.roosterclub.app';
// Order of sections on the page. buy:false = shown for looking only.
const SECTIONS=[
  {key:'accessories',title:'Accessories',sub:'Incubators, brooder kits, leg rings, BSF and azolla grow kits and more',buy:true},
  {key:'apparel',title:'Apparel',sub:'Rooster Club T-shirts — printed for you, paid online',buy:false},
  {key:'feed_supplement',title:'Feed Supplements',sub:'Natural care for your birds: herbal blends, electrolytes, gut and liver care',buy:true},
  {key:'laddus',title:'Nutri Laddus',sub:'Traditional nutrition laddus for roosters',buy:true},
  {key:'feed',title:'Feed',sub:'Healthy, balanced feed for chicks, layers and breeders — and natural BSF larvae',buy:true}
];
// 28 Nov 2026 (Ranga): only T-shirts can be ordered for now. Everything else is for looking only.
// To reopen, set ORDERS_OPEN=true here AND switch off the server lock (app_config shop_order_open).
const ORDERS_OPEN=false;
const canBuy=p=>ORDERS_OPEN&&p&&p.category!=='apparel';

/* Coming soon: products being made now (mockups / labels). Shown for looking only; no price, no cart.
   When one goes live in Command Center it shows from the database instead — then delete it here. */
const IMG='/shop/img/', HF='https://d8j0ntlcm91z4.cloudfront.net/user_3EjNOZW3fu3qjwjF3BvHoKgXlnl/';
const NOTMED='Feed supplement — not a medicine. Not intended to diagnose, treat or cure any disease. For animal use only.';
const COMING=[
  {slug:'daily-prime',cat:'feed_supplement',name:'Daily Prime',tag:'Everyday',sub:'Everyday nutrition',size:'250 g jar',img:IMG+'daily-prime.webp',
   benefits:['Complete daily vitamins and minerals','Methionine, lysine and betaine for muscle and stamina','Probiotics, enzymes and liver care for the gut','One jar treats 50 kg of feed'],
   comp:[['Vitamins (per kg)','A 30,00,000 IU · D3 20,00,000 IU · E 8,000 IU · K3 200 mg · B1 200 mg · B2 1,000 mg · B3 2,400 mg · B5 1,600 mg · B6 320 mg · B12 10 mg · Biotin 80 mg · Folic acid 200 mg'],['Amino acids (per kg)','DL-Methionine 200 g · L-Lysine 200 g · Betaine 100 g'],['Minerals (per kg)','Calcium 50,000 mg · Phosphorus 25,000 mg · Zinc 16,000 mg · Manganese 16,000 mg · Iron 10,000 mg · Copper 2,000 mg · Selenium 100 mg'],['Gut and liver care (per kg)','Probiotics 1,600 billion CFU · Prebiotics 95 g · Enzymes 32,00,000 U · Phytase 2,00,000 U · Toxin binder 5,000 mg · Liver protectant 100 g']],
   use:['Adult roosters, hens and gamefowl: 5 g per kg of feed, every alternate day','Chicks up to 8 weeks: 2.5 g per kg of feed, every alternate day','Moult, heat stress, conditioning, recovery: 5 g per kg of feed daily for 5 days, then back to alternate days','Mix with a handful of feed first, then into the full ration. Do not give another vitamin-mineral premix the same day.'],note:NOTMED},
  {slug:'breath-easy',cat:'feed_supplement',name:'Breath Easy',tag:'Herbal',sub:'Herbal respiratory care',size:'250 g jar',img:IMG+'breath-easy.webp',
   benefits:['Supports clear airways and easy breathing','Helps loosen mucus','Keeps birds eating during seasonal change'],
   comp:[['Ayurvedic herbs (per kg)','Vasaka 20 g · Mulethi 20 g · Pippali 10 g · Saunth 10 g · Dalchini 8 g · Akarkara 8 g · Harad 5 g · Madar 5 g · Bakuchi 5 g']],
   use:['Adult birds: 1.5–2 g per 10 birds daily, in feed','Growers: 1 g per 10 birds daily','Chicks: 0.5 g per 10 birds daily','Give up to 7 days. If no change in 3 days, see your vet. Keep sick birds apart.'],note:NOTMED},
  {slug:'stress-shield',cat:'feed_supplement',name:'Stress Shield',tag:'Herbal',sub:'Anti-stress and immunity',size:'250 g jar',img:IMG+'stress-shield.webp',
   benefits:['Helps birds stay calm through heat, cold and travel','Supports natural immunity','Antioxidant protection against stress','Supports appetite and recovery'],
   comp:[['Herbal adaptogens (per kg)','Amla 80 g · Giloy 20 g · Tulsi 20 g · Ashwagandha 20 g'],['Vitamin (per kg)','Vitamin C 20 g']],
   use:['Routine: 1 g per 10 birds daily in drinking water','Heat, cold, travel, vaccination, shifting: 2 g per 10 birds daily','In feed instead: 0.5–1 g per kg of feed daily'],note:NOTMED},
  {slug:'bloodline-boost',cat:'feed_supplement',name:'Bloodline Boost',tag:'Fertility',sub:'Fertility and strength',size:'250 g jar',img:IMG+'bloodline-boost.webp',
   benefits:['Supports sperm quality in roosters','Improves egg fertility and hatchability','Supports muscle strength and body tone','Antioxidant protection during heat and handling'],
   comp:[['Antioxidants (per kg)','Vitamin E 1,00,000 mg · Selenium 1,000 mg']],
   use:['Adult birds: 1 g per 5 litres of water, daily for 5–7 days','Breeding season: 2 g per 5 litres of water, daily for 5–7 days','Chicks: 1 g per 5 litres of water, daily for 5 days','Do not give another selenium supplement the same day.'],note:NOTMED},
  {slug:'gut-prime',cat:'feed_supplement',name:'Gut Prime',tag:'Gut health',sub:'Digestion and gut health',size:'250 g jar',img:IMG+'gut-prime.webp',
   benefits:['Supports healthy digestion','Helps firm up loose droppings after a feed change','Probiotics and yeast for a healthy gut'],
   comp:[['Binder and minerals (per kg)','HSCAS 200 g · Dicalcium phosphate 100 g · Sodium bicarbonate 10 g'],['Probiotics and yeast (per kg)','Yeast 50 g · Lactobacillus 1,000 mg'],['Amino acids (per kg)','L-Lysine 2,000 mg · DL-Methionine 2,000 mg']],
   use:['Adult birds: 1 g per kg of feed daily','Chicks and growers: 0.5 g per kg of feed daily','One jar treats 250 kg of feed'],note:NOTMED},
  {slug:'summer-shield',cat:'feed_supplement',name:'Summer Shield',tag:'Electrolytes',sub:'Electrolyte and energy',size:'250 g jar',img:IMG+'summer-shield.webp',
   benefits:['Replaces salts lost in hot weather','Quick energy from dextrose','Helps reduce panting and weakness'],
   comp:[['Electrolytes (per kg)','Potassium chloride 35 g · Sodium citrate 25 g · Sodium chloride 17.5 g · Magnesium sulphate 12 g · Calcium lactate 11 g · Sodium bicarbonate 10 g'],['Energy and vitamin (per kg)','Dextrose 25 g · Vitamin C 10 g']],
   use:['All birds: 1 g per 2 litres of cool drinking water, daily for 3–6 days','One jar makes 500 litres'],note:NOTMED},
  {slug:'liver-tonic',cat:'feed_supplement',name:'Liver Tonic',tag:'Liver care',sub:'Liver and metabolism care',size:'500 ml bottle',img:IMG+'liver-tonic.webp',
   benefits:['Supports a healthy liver and fat metabolism','Improves digestion and nutrient use','Supports recovery after stress'],
   comp:[['Liver care (per 10 ml)','Tricholine citrate 1,500 mg · Liver extract 180 mg · Inositol 10 mg'],['Amino acids (per 10 ml)','Protein hydrolysate 100 mg · L-Lysine 80 mg · DL-Methionine 70 mg'],['Vitamin and yeast (per 10 ml)','Yeast extract 40 mg · Niacin 24 mg']],
   use:['Adult birds: 2 ml per 10 birds daily in drinking water','Growers: 1.5 ml per 10 birds daily','Chicks: 1 ml per 10 birds daily','Shake well before use.'],note:NOTMED},
  {slug:'feed-chicks',cat:'feed',name:'Chicks Poultry Feed',tag:'10 kg',sub:'Starter and grower feed',size:'10 kg bag',img:IMG+'feed-chicks.jpg',
   benefits:['Faster growth','Stronger bones','Better immunity','Healthy gut'],note:'Complete and balanced nutrition for healthy, fast-growing chicks.'},
  {slug:'feed-layers',cat:'feed',name:'Layers Poultry Feed',tag:'10 kg',sub:'For high egg production',size:'10 kg bag',img:IMG+'feed-layers.jpg',
   benefits:['More eggs','Stronger shells','Better health and immunity','Active, healthy birds'],note:'Complete and balanced nutrition for strong, healthy hens.'},
  {slug:'feed-breeders',cat:'feed',name:'Breeders Poultry Feed',tag:'10 kg',sub:'For breeding performance',size:'10 kg bag',img:IMG+'feed-breeders.jpg',
   benefits:['Better fertility','Higher hatchability','Strong body and stamina','Disease resistance'],note:'Complete and balanced nutrition for breeding roosters and hens.'},
  {slug:'bsf-dry-larvae',cat:'feed',name:'BSF Dry Larvae',tag:'Natural protein',sub:'Healthy chicken feed',size:'Pouch',img:HF+'hf_20261014_134602_7b8f00ef-48b1-4585-97ae-04b347eab2b7.png',
   benefits:['Whole dried black soldier fly larvae','Natural, high-protein feed birds love','Give a handful on top of the normal feed'],note:'A natural protein feed for country chicken and gamefowl.'},
  {slug:'bsf-grow-kit',cat:'accessories',name:'BSF Grow Kit',tag:'Kit',sub:'Grow your own larvae feed at home',size:'Kit',img:HF+'hf_20261014_134532_f2fdd8cd-3d23-42b5-9a8f-e8995ce55d2e.png',
   benefits:['1 BSF grow tank (6 × 3 ft, 350 GSM, with frame)','2 BSF crates','2 sieves','1 mosquito net','5 egg collectors'],note:'Everything to start growing black soldier fly larvae for your birds. BSF eggs sold separately.'},
  {slug:'bsf-grow-tank',cat:'accessories',name:'BSF Grow Tank',tag:'Equipment',sub:'6 × 3 ft · 350 GSM · with frame',size:'1 tank',img:HF+'hf_20261014_134531_098647f3-530e-4388-b6f2-365c328f027d.png',
   benefits:['Green 6 × 3 ft tank with support frame','Takes about 20 g of BSF eggs'],note:'Strong tank for growing larvae at home.'},
  {slug:'bsf-crate',cat:'accessories',name:'BSF Crate',tag:'Equipment',sub:'Stackable hatching crate',size:'1 crate',img:HF+'hf_20261014_134601_3603adf9-ff8b-46ef-a9f8-a5a20befa096.png',
   benefits:['Blue stackable crate for hatching BSF eggs','Takes about 10 g of eggs'],note:'Hatch BSF eggs before moving them to the tank.'},
  {slug:'azolla-grow-tank',cat:'accessories',name:'Azolla Grow Tank',tag:'Plastic tank',sub:'Plastic tank · 10 × 3 ft',size:'1 tank',img:HF+'hf_20261014_134531_098647f3-530e-4388-b6f2-365c328f027d.png',
   benefits:['Strong plastic tank, 10 × 3 ft','Grow azolla, a fresh green feed, at home','Cuts your feed bill','Birds eat it fresh every day'],note:'Grow a fresh azolla bed for your birds in one plastic tank.'}
];
const comingOf=cat=>COMING.filter(c=>c.cat===cat);
const bySlug=s=>COMING.find(c=>c.slug===s);
const BADGES={bestseller:'Bestseller',most_bought:'Most bought',new:'New'};
const STEPS=[['pending','Order placed'],['confirmed','Confirmed'],['packed','Packed'],['shipped','Shipped'],['delivered','Delivered']];
const STATUS_TEXT={
  pending:'Order placed. We will call you to confirm it.',
  confirmed:'Confirmed. We are getting it ready.',
  packed:'Packed and ready to ship.',
  shipped:'On the way to you.',
  delivered:'Delivered. Thank you for shopping with Rooster Club.',
  cancelled:'This order was cancelled.',
  awaiting_payment:'Waiting for your payment.',
  payment_review:'We are checking your payment.'
};

const main=document.getElementById('shop');
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>'₹'+Number(n||0).toLocaleString('en-IN');
const safeUrl=u=>/^https:\/\//i.test(String(u||''))?String(u):'';
const store={
  get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};

async function api(path,opts){
  const r=await fetch(SB+'/rest/v1/'+path,Object.assign({headers:{apikey:KEY,Authorization:'Bearer '+KEY,'Content-Type':'application/json'}},opts||{}));
  const txt=await r.text(); let body=null; try{body=txt?JSON.parse(txt):null}catch(e){}
  if(!r.ok){ const e=new Error((body&&body.message)||'Something went wrong. Please try again.'); e.server=!!(body&&body.code==='22023'); throw e; }
  return body;
}
const rpc=(fn,args)=>api('rpc/'+fn,{method:'POST',body:JSON.stringify(args)});

/* ---------- products ---------- */
let PRODUCTS=null;
async function loadProducts(){
  if(PRODUCTS) return PRODUCTS;
  const rows=await api('shop_products?category=in.('+SECTIONS.map(s=>s.key).join(',')+')&status=in.(active,out_of_stock)&removed_at=is.null'
    +'&select=id,category,name,name_te,unit,price,mrp,stock_count,status,images,image_url,description,details,apparel,delivery_included,rating_avg,rating_count'
    +'&order=price.desc');
  PRODUCTS=(rows||[]).filter(p=>p.price>0);
  return PRODUCTS;
}
const byId=id=>(PRODUCTS||[]).find(p=>p.id===id);
const inStock=p=>p&&p.status==='active'&&p.stock_count>0;
const teeFrom=p=>{const t=((p.apparel||{}).types||[]).map(x=>Number(x.price)).filter(n=>n>0);return t.length?Math.min.apply(null,t):p.price};
const pics=p=>{const a=(p.images&&p.images.length?p.images:[p.image_url]).map(safeUrl).filter(Boolean);return a.length?a:['']};
const off=p=>p.mrp&&p.mrp>p.price?Math.round((p.mrp-p.price)*100/p.mrp):0;
const det=p=>p.details||{};

/* ---------- cart ---------- */
function cart(){return store.get(CART_KEY,[]).filter(l=>l&&l.id&&l.qty>0)}
function saveCart(c){store.set(CART_KEY,c);paintCartCount()}
function addToCart(id,qty){
  const p=byId(id); if(!inStock(p)||!canBuy(p)) return;
  const c=cart(); const l=c.find(x=>x.id===id);
  const max=Math.min(MAX_QTY,p.stock_count);
  if(l) l.qty=Math.min(max,l.qty+qty); else c.push({id,qty:Math.min(max,qty)});
  saveCart(c);
}
function setQty(id,qty){
  const p=byId(id); let c=cart();
  if(qty<=0) c=c.filter(x=>x.id!==id);
  else c.forEach(x=>{if(x.id===id) x.qty=Math.min(qty,MAX_QTY,p?p.stock_count:MAX_QTY)});
  saveCart(c);
}
function cartLines(){return cart().map(l=>({l,p:byId(l.id)})).filter(x=>x.p&&canBuy(x.p))}
function totals(lines){
  let sub=0,base=0;
  lines.forEach(({l,p})=>{sub+=p.price*l.qty; if(!p.delivery_included) base+=p.price*l.qty;});
  const fee=base===0?0:(sub>=FREE_DELIVERY?0:DELIVERY_FEE);
  return {sub,fee,total:sub+fee};
}
function paintCartCount(){
  const n=cart().reduce((s,l)=>s+l.qty,0);
  document.getElementById('cartCount').textContent=n;
  const bar=document.getElementById('cartBar');
  const route=location.hash.slice(1);
  if(n>0 && PRODUCTS && !/^(cart|checkout|o\/)/.test(route)){
    const t=totals(cartLines());
    document.getElementById('cartBarText').textContent=n+(n===1?' item':' items')+' · '+money(t.sub);
    bar.hidden=false;
  } else bar.hidden=true;
  document.getElementById('myOrdersLink').hidden=!store.get(ORDERS_KEY,[]).length;
}

function toast(t){const el=document.createElement('div');el.className='shop-toast';el.textContent=t;document.body.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));setTimeout(()=>{el.classList.remove('on');setTimeout(()=>el.remove(),300)},1800);}

/* ---------- pages ---------- */
function priceBlock(p,big){
  if(p.category==='apparel') return '<div class="price'+(big?' big':'')+'"><b>From '+money(teeFrom(p))+'</b></div>';
  const o=off(p);
  return '<div class="price'+(big?' big':'')+'"><b>'+money(p.price)+'</b>'
    +(o?'<s>'+money(p.mrp)+'</s><span class="off">'+o+'% off</span>':'')+'</div>';
}

const secOf=k=>SECTIONS.find(x=>x.key===k)||{title:'Shop',key:k};
const teeCount=p=>((p.apparel||{}).types||[]).length;
function rating(p){ return p.rating_count>0?'<p class="rate">'+Number(p.rating_avg).toFixed(1)+' out of 5 · '+p.rating_count+(p.rating_count===1?' review':' reviews')+'</p>':''; }

function card(p){
  const d=det(p), b=BADGES[d.badge], tee=p.category==='apparel', im=pics(p);
  const tag=tee?'':(!inStock(p)?'<span class="ptag grey">Out of stock</span>':(!canBuy(p)?'<span class="ptag soft">Orders open soon</span>':''));
  return '<a class="pcard'+(inStock(p)||tee?'':' oos')+'" href="#p/'+esc(p.id)+'">'
    +'<div class="pimg'+(im[1]?' two':'')+(tee?' cover':'')+'">'+(im[0]?'<img src="'+esc(im[0])+'" alt="'+esc(p.name)+'" loading="lazy">':'')
    +(im[1]?'<img class="alt" src="'+esc(im[1])+'" alt="" loading="lazy">':'')
    +(b?'<span class="stamp">'+esc(b)+'</span>':'')+(tee?'<span class="stamp dark">Printed for you</span>':'')+'</div>'
    +'<div class="pbody"><h3>'+esc(p.name)+'</h3>'
    +((tee?(p.apparel||{}).benefit:d.subtitle)?'<p class="psub">'+esc(tee?p.apparel.benefit:d.subtitle)+'</p>':'')
    +priceBlock(p)+rating(p)
    +(!tee&&canBuy(p)&&inStock(p)&&p.stock_count<=5?'<p class="few">Only '+p.stock_count+' left</p>':'')
    +tag+'</div></a>';
}

function soonCard(c){
  return '<a class="pcard" href="#c/'+esc(c.slug)+'">'
    +'<div class="pimg"><img src="'+esc(c.img)+'" alt="'+esc(c.name)+'" loading="lazy">'
    +'<span class="stamp">'+esc(c.tag)+'</span></div>'
    +'<div class="pbody"><h3>'+esc(c.name)+'</h3><p class="psub">'+esc(c.sub)+' · '+esc(c.size)+'</p><span class="ptag soft">Coming soon</span></div></a>';
}

function soonPage(slug){
  const c=bySlug(slug); if(!c){ location.hash=''; return; }
  document.title=c.name+' — Rooster Club Shop';
  const wa='https://wa.me/'+WA+'?text='+encodeURIComponent('Hi, please tell me when '+c.name+' is available in the Rooster Club Shop.');
  main.innerHTML='<div class="wrap">'+crumbs(c.cat,c.name)+''
    +'<div class="pdetail"><div class="gallery"><div class="gmain"><img src="'+esc(c.img)+'" alt="'+esc(c.name)+'"></div></div><div class="pinfo">'
      +'<span class="stamp static">'+esc(c.tag)+'</span> <span class="stamp static soft">Coming soon</span>'
      +'<h1>'+esc(c.name)+'</h1><p class="psub">'+esc(c.sub)+' · '+esc(c.size)+'</p>'
      +'<div class="appbox"><p>We are getting this ready. Ask us on WhatsApp and we will tell you as soon as it is in stock.</p><a class="btn" href="'+wa+'">Tell me when it is ready</a></div>'
      +(c.benefits&&c.benefits.length?'<h2>'+(c.cat==='accessories'?'What you get':'Key benefits')+'</h2><ul class="ticks">'+c.benefits.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':'')
      +(c.comp?'<h2>Composition</h2><table class="specs">'+c.comp.map(r=>'<tr><th>'+esc(r[0])+'</th><td>'+esc(r[1])+'</td></tr>').join('')+'</table>':'')
      +(c.use?'<h2>How to use</h2><ul class="ticks">'+c.use.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':'')
      +(c.note?'<p class="desc soonnote">'+esc(c.note)+'</p>':'')
    +'</div></div></div>';
}


function crumbs(cat,name){
  const sec=secOf(cat);
  return '<nav class="crumbs"><a href="#">Shop</a><span>/</span><a href="#sec-'+esc(sec.key)+'">'+esc(sec.title)+'</a><span>/</span><b>'+esc(name)+'</b></nav>';
}

function trustRow(p){
  const tee=p&&p.category==='apparel';
  return '<ul class="assure">'
    +'<li><b>'+(tee||(p&&p.delivery_included)?'Delivery included':'Free delivery over '+money(FREE_DELIVERY))+'</b><span>Across India, with a tracking link</span></li>'
    +'<li><b>'+(tee?'Secure online payment':(ORDERS_OPEN?'Cash on delivery':'Secure checkout'))+'</b><span>'+(tee?'UPI, card or net banking by CCAvenue':'Pay the way you like')+'</span></li>'
    +'<li><b>Sold by Rooster Club</b><span>Packed and shipped from Hyderabad</span></li>'
    +'<li><b>Real people on WhatsApp</b><span><a href="https://wa.me/'+WA+'">95153 69756</a></span></li></ul>';
}

function related(p){
  const r=(PRODUCTS||[]).filter(x=>x.category===p.category&&x.id!==p.id).slice(0,4);
  return r.length?'<section class="more"><div class="shead row"><h2>You may also like</h2><a href="#sec-'+esc(p.category)+'">See all</a></div><div class="pgrid">'+r.map(card).join('')+'</div></section>':'';
}

/* Phone only: a bar that stays at the bottom with the price and the main button. */
function stickyBar(name,priceText){
  const prim=main.querySelector('[data-primary]'); if(!prim) return;
  const bar=document.createElement('div'); bar.className='sbar';
  const dis=prim.disabled;
  bar.innerHTML='<div class="sbar-t"><b>'+esc(name)+'</b><span>'+esc(priceText)+'</span></div><button class="btn">'+esc(dis?'Pick a size':(prim.textContent||'Buy now').trim())+'</button>';
  bar.querySelector('button').onclick=()=>{ if(dis){const t=main.querySelector('.sizes');if(t)t.scrollIntoView({behavior:'smooth',block:'center'});} else prim.click(); };
  main.appendChild(bar);
  if('IntersectionObserver' in window){ const io=new IntersectionObserver(es=>es.forEach(e=>bar.classList.toggle('on',!e.isIntersecting&&e.boundingClientRect.top<0)));io.observe(prim); }
  else bar.classList.add('on');
}

function listPage(){
  document.title='Rooster Club Shop — Poultry Accessories, Supplements, Laddus & Apparel';
  const tees=PRODUCTS.filter(p=>p.category==='apparel');
  const heroImgs=tees.map(p=>pics(p)[0]).filter(Boolean).slice(0,3);
  const catList=SECTIONS.filter(sec=>PRODUCTS.some(p=>p.category===sec.key)||comingOf(sec.key).length).map(sec=>{
    const items=PRODUCTS.filter(p=>p.category===sec.key), soon=comingOf(sec.key);
    const img=(items[0]&&pics(items[0])[0])||(soon[0]&&soon[0].img)||'';
    const n=items.length+soon.length;
    return '<a class="cat" href="#sec-'+sec.key+'" data-jump="sec-'+sec.key+'"><div class="cimg">'+(img?'<img src="'+esc(img)+'" alt="" loading="lazy">':'')+'</div>'
      +'<b>'+esc(sec.title)+'</b><span>'+n+(n===1?' item':' items')+'</span></a>';
  });
  const order=SECTIONS.filter(x=>x.key==='apparel').concat(SECTIONS.filter(x=>x.key!=='apparel'));
  const secs=order.map(sec=>{
    const items=PRODUCTS.filter(p=>p.category===sec.key), soon=comingOf(sec.key);
    return '<section class="ssec" id="sec-'+sec.key+'"><div class="shead"><p class="kicker">'+(sec.key==='apparel'?'Order now':(ORDERS_OPEN?'In stock':'Orders open soon'))+'</p><h2>'+esc(sec.title)+'</h2><p>'+esc(sec.sub)+'</p></div>'
      +(items.length||soon.length?'<div class="pgrid">'+items.map(card).join('')+soon.map(soonCard).join('')+'</div>'
        :'<div class="soon"><b>Coming soon</b><span>We are getting these ready. <a href="https://wa.me/'+WA+'?text='+encodeURIComponent('Hi, tell me when '+sec.title+' are available in the Rooster Club Shop.')+'">Tell me when they arrive</a></span></div>')
      +'</section>';
  }).join('');
  const faq=[
    ['How long does delivery take?','Most orders reach you in 4–8 days. Printed T-shirts are made for you, so they take 5–7 days to print and ship. You get a tracking link as soon as your parcel leaves.'],
    ['How do I pay?',ORDERS_OPEN?'Pay online (UPI, card or net banking) or pay cash when the parcel arrives. T-shirts are paid online only.':'T-shirts are paid online by UPI, card or net banking through CCAvenue, a secure payment company. Other items open for orders soon.'],
    ['Can I track my order?','Yes. After you order you get a page with your order status. You can open it again any time from "My orders" on the same phone, or WhatsApp us your order number.'],
    ['What if something is wrong with my order?','WhatsApp us a photo on 95153 69756 and we will sort it out. Read our <a href="/refund-policy.html">refund policy</a> and <a href="/shipping-policy.html">delivery policy</a>.']
  ];
  main.innerHTML='<section class="hero2"><div class="wrap hero2-in">'
      +'<div class="hero2-txt"><p class="kicker">New · Rooster Club Apparel</p>'
      +'<h1>Wear the rooster.</h1>'
      +'<p class="lead">Heavy cotton T-shirts printed with Aseel and rooster art, made for the people who keep them. Printed for you and delivered across India.</p>'
      +'<div class="hero2-cta"><a class="btn big" href="#sec-apparel" data-jump="sec-apparel">Shop T-shirts</a><a class="btn ghost big" href="#cats" data-jump="cats">All products</a></div>'
      +'<p class="fine">'+(tees.length?'From '+money(Math.min.apply(null,tees.map(teeFrom)))+' · ':'')+'Delivery included · Secure online payment</p></div>'
      +'<div class="hero2-pics n'+heroImgs.length+'">'+heroImgs.map((u,i)=>'<img src="'+esc(u)+'" alt="Rooster Club T-shirt" '+(i?'loading="lazy"':'fetchpriority="high"')+'>').join('')+'</div>'
    +'</div></section>'
    +'<div class="band"><div class="wrap band-in"><span><b>Delivery across India</b></span><span><b>Sold &amp; shipped by Rooster Club</b>, Hyderabad</span><span><b>Help on WhatsApp</b> 95153 69756</span></div></div>'
    +'<div class="wrap">'
    +'<section class="ssec" id="cats"><div class="shead"><p class="kicker">Shop by category</p><h2>Everything for your birds</h2></div><div class="cats" style="--n:'+catList.length+'">'+catList.join('')+'</div></section>'
    +secs
    +'<section class="story"><div class="story-in"><p class="kicker">Our story</p><h2>Made by keepers, for keepers.</h2>'
      +'<p>Rooster Club started as an app where country-chicken and Aseel keepers buy and sell birds. This shop sells the things our members kept asking for, chosen by a team with a background in animal nutrition and feed.</p>'
      +'<p>Every order is packed and shipped by us from Hyderabad. If you need help, you talk to a real person on WhatsApp.</p>'
      +'<a class="btn ghost" href="/about.html">About Rooster Club</a></div></section>'
    +'<section class="ssec"><div class="shead"><p class="kicker">Simple</p><h2>How ordering works</h2></div><ol class="how">'
      +'<li><b>Pick</b><span>Choose your item'+(tees.length?', style, colour and size':'')+'. No account needed.</span></li>'
      +'<li><b>Pay</b><span>'+(ORDERS_OPEN?'Online or cash on delivery.':'Pay online by UPI, card or net banking.')+'</span></li>'
      +'<li><b>Get it</b><span>We ship it to your door and send you a tracking link.</span></li></ol></section>'
    +'<section class="ssec faqs"><div class="shead"><p class="kicker">Questions</p><h2>Good to know</h2></div>'
      +faq.map(f=>'<details class="faq"><summary>'+esc(f[0])+'</summary><p>'+f[1]+'</p></details>').join('')+'</section>'
    +'<section class="appband"><div><p class="kicker">Rooster Club app</p><h2>Buy and sell birds with keepers near you</h2><p>Listings, chat, Rooster School and Breeder Pro — free on Android.</p></div><a class="btn big" href="'+PLAY+'">Get the app</a></section>'
    +'</div>';
  main.querySelectorAll('[data-jump]').forEach(a=>a.onclick=e=>{e.preventDefault();const t=document.getElementById(a.dataset.jump);if(t)t.scrollIntoView({behavior:'smooth'});});
}

async function teePage(p){
  const a=p.apparel||{};
  main.innerHTML='<div class="wrap narrow"><p class="shop-loading">Loading…</p></div>';
  let TEES=false; try{TEES=!!((await rpc('web_shop_pay_options',{}))||{}).tees}catch(e){}
  let types=[]; try{ types=(await rpc('web_tee_options',{p_product:p.id}))||[] }catch(e){}
  types=types.filter(t=>t.price>0&&(t.colours||[]).length);
  let ti=0, ci=0, size='', qty=1;
  const imgsFor=()=>{const c=(types[ti]||{}).colours?types[ti].colours[ci]:null;const im=(c&&c.images||[]).map(safeUrl).filter(Boolean);return im.length?im:pics(p)};
  function paint(){
    const t=types[ti], c=t?t.colours[ci]:null, imgs=imgsFor();
    const sizes=c?(c.sizes||[]):[], sz=sizes.find(x=>x.size===size);
    main.innerHTML='<div class="wrap">'+crumbs('apparel',p.name)
    +'<div class="pdetail"><div class="gallery">'
      +'<div class="gmain cover"><img id="gmain" src="'+esc(imgs[0])+'" alt="'+esc(p.name)+'"></div>'
      +(imgs.length>1?'<div class="gthumbs">'+imgs.map((u,i)=>'<button class="gthumb'+(i?'':' on')+'" data-src="'+esc(u)+'"><img src="'+esc(u)+'" alt=""></button>').join('')+'</div>':'')
    +'</div><div class="pinfo">'
      +'<span class="stamp static dark">Printed for you · pay online</span>'
      +'<h1>'+esc(p.name)+'</h1>'
      +(a.benefit?'<p class="psub">'+esc(a.benefit)+'</p>':'')
      +(t?'<div class="price big"><b>'+money(t.price)+'</b></div><p class="incl">Delivery included · printed and shipped in 5–7 days</p>':'')
      +(!types.length?'<div class="appbox"><p>This design is not open for orders right now.</p><a class="btn" href="'+PLAY+'">Get the Rooster Club app</a></div>':
        '<h2>Style</h2><div class="chips">'+types.map((x,i)=>'<button class="chip'+(i===ti?' on':'')+'" data-t="'+i+'">'+esc(x.label)+' <small>'+money(x.price)+'</small></button>').join('')+'</div>'
        +'<h2>Colour'+(c?': <span class="muted">'+esc(c.name)+'</span>':'')+'</h2><div class="swatches">'+t.colours.map((x,i)=>'<button class="sw'+(i===ci?' on':'')+'" data-c="'+i+'" title="'+esc(x.name)+'" aria-label="'+esc(x.name)+'" style="background:'+esc(/^#[0-9a-f]{3,8}$/i.test(x.hex||'')?x.hex:'#ccc')+'"></button>').join('')+'</div>'
        +'<h2>Size</h2><div class="chips sizes">'+sizes.map(x=>'<button class="chip'+(x.size===size?' on':'')+'" data-s="'+esc(x.size)+'">'+esc(x.size)+'</button>').join('')+'</div>'
        +'<div class="buy"><div class="qty"><button data-q="-1" aria-label="Less">−</button><span id="q">'+qty+'</span><button data-q="1" aria-label="More">+</button></div>'
        +(TEES?'<button class="btn" id="teebuy" data-primary'+(sz?'':' disabled')+'>'+(sz?'Buy now · '+money(t.price*qty):'Pick a size')+'</button>'
               :'<button class="btn" disabled>Orders open soon</button>')+'</div>'
        +(TEES?'<p class="fine">Paid online (UPI, card or net banking). No cash on delivery for printed T-shirts.</p>'
               :'<p class="fine">Online payment opens soon. Until then you can order in the <a href="'+PLAY+'">Rooster Club app</a>.</p>'))
      +(p.description?'<p class="desc">'+esc(p.description)+'</p>':'')
      +trustRow(p)
      +((a.fabric||a.print||a.neck)?'<h2>Details</h2><ul class="ticks">'+[a.print,t&&t.gsm?t.gsm+' GSM':'',a.fabric,a.neck,a.made_in?'Made in '+a.made_in:''].filter(Boolean).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':'')
    +'</div></div>'+related(p)+'</div>';
    if(t) stickyBar(p.name,money(t.price*qty));
    main.querySelectorAll('.gthumb').forEach(b=>b.onclick=()=>{document.getElementById('gmain').src=b.dataset.src;main.querySelectorAll('.gthumb').forEach(x=>x.classList.toggle('on',x===b));});
    main.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ti=+b.dataset.t;ci=0;size='';paint();});
    main.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{ci=+b.dataset.c;const ok=(types[ti].colours[ci].sizes||[]).some(x=>x.size===size);if(!ok)size='';paint();});
    main.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{size=b.dataset.s;paint();});
    main.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{qty=Math.max(1,Math.min(5,qty+Number(b.dataset.q)));paint();});
    const buy=document.getElementById('teebuy');
    if(buy&&sz) buy.onclick=()=>{
      try{sessionStorage.setItem(TEE_KEY,JSON.stringify({id:p.id,variant_id:sz.variant_id,qty,price:t.price,
        name:p.name+' · '+t.label+' · '+c.name+' · '+sz.size,img:imgs[0]}))}catch(e){}
      location.hash='checkout/tee';
    };
  }
  paint();
}

function productPage(id){
  const p=byId(id);
  if(!p){ main.innerHTML='<div class="wrap narrow"><div class="box center"><h1>Item not found</h1><p class="muted">This item is no longer in the shop.</p><a class="btn" href="#">Go to the shop</a></div></div>'; return; }
  document.title=p.name+' — Rooster Club Shop';
  if(p.category==='apparel') return teePage(p);
  const d=det(p), imgs=pics(p), ok=inStock(p), max=Math.min(MAX_QTY,p.stock_count||0);
  const list=(title,arr)=>arr&&arr.length?'<h2>'+title+'</h2><ul class="ticks">'+arr.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':'';
  const kit=(d.kit_ids||[]).map(byId).filter(Boolean);
  main.innerHTML='<div class="wrap">'+crumbs(p.category,p.name)
    +'<div class="pdetail"><div class="gallery">'
      +'<div class="gmain"><img id="gmain" src="'+esc(imgs[0])+'" alt="'+esc(p.name)+'"></div>'
      +(imgs.length>1?'<div class="gthumbs">'+imgs.map((u,i)=>'<button class="gthumb'+(i?'':' on')+'" data-src="'+esc(u)+'"><img src="'+esc(u)+'" alt=""></button>').join('')+'</div>':'')
    +'</div><div class="pinfo">'
      +(BADGES[d.badge]?'<span class="stamp static">'+esc(BADGES[d.badge])+'</span>':'')
      +'<h1>'+esc(p.name)+'</h1>'+(p.name_te?'<p class="te">'+esc(p.name_te)+'</p>':'')
      +(d.subtitle?'<p class="psub">'+esc(d.subtitle)+'</p>':'')
      +priceBlock(p,true)+rating(p)
      +'<p class="incl">'+(p.delivery_included?'Delivery included':'Free delivery on orders of '+money(FREE_DELIVERY)+'+, else '+money(DELIVERY_FEE))+(ORDERS_OPEN?' · Cash on delivery':'')+'</p>'
      +(!ORDERS_OPEN?'<div class="appbox"><p>Orders for this item open soon. Ask us on WhatsApp and we will tell you when you can order.</p><a class="btn" data-primary href="https://wa.me/'+WA+'?text='+encodeURIComponent('Hi, please tell me when I can order '+p.name+'.')+'">Ask on WhatsApp</a></div>'
        :ok?'<div class="buy"><div class="qty"><button data-q="-1" aria-label="Less">−</button><span id="q">1</span><button data-q="1" aria-label="More">+</button></div>'
          +'<button class="btn ghost" id="add">Add to cart</button><button class="btn" id="now" data-primary>Buy now</button></div>'
          +(p.stock_count<=5?'<p class="few">Only '+p.stock_count+' left</p>':'')
        :'<p class="oosnote">Out of stock right now. <a href="https://wa.me/'+WA+'?text='+encodeURIComponent('Hi, please tell me when '+p.name+' is back in stock.')+'">Ask on WhatsApp</a></p>')
      +'<ul class="facts">'
        +(d.ships_days?'<li>Ships in '+d.ships_days+(d.ships_days===1?' day':' days')+'</li>':'')
        +(d.warranty?'<li>'+esc(d.warranty)+' warranty</li>':'')
        +'<li>Sold by Rooster Club, Hyderabad</li></ul>'
      +trustRow(p)
      +(p.description?'<p class="desc">'+esc(p.description)+'</p>':'')
      +(kit.length?'<h2>What the kit has</h2><ul class="kit">'+kit.map(k=>'<li><a href="#p/'+esc(k.id)+'">'+esc(k.name)+'</a> <span>'+money(k.price)+'</span></li>').join('')+'</ul>':'')
      +list('Good for',d.good_for)+list('In the box',d.box)
      +(d.specs&&d.specs.length?'<h2>Details</h2><table class="specs">'+d.specs.map(r=>'<tr><th>'+esc(r[0])+'</th><td>'+esc(r[1])+'</td></tr>').join('')+'</table>':'')
      +(d.steps&&d.steps.length?'<h2>How to use</h2><ol class="steps-ol">'+d.steps.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol>':'')
      +(d.faq&&d.faq.length?'<h2>Questions</h2>'+d.faq.map(f=>'<details class="faq"><summary>'+esc(f.q)+'</summary><p>'+esc(f.a)+'</p></details>').join(''):'')
    +'</div></div>'+related(p)+'</div>';
  stickyBar(p.name,money(p.price));
  main.querySelectorAll('.gthumb').forEach(b=>b.onclick=()=>{document.getElementById('gmain').src=b.dataset.src;main.querySelectorAll('.gthumb').forEach(x=>x.classList.toggle('on',x===b));});
  if(ok&&ORDERS_OPEN){
    let q=1; const qEl=document.getElementById('q');
    main.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{q=Math.max(1,Math.min(max,q+Number(b.dataset.q)));qEl.textContent=q;});
    document.getElementById('add').onclick=()=>{addToCart(p.id,q);toast('Added to cart');paintCartCount();};
    document.getElementById('now').onclick=()=>{addToCart(p.id,q);location.hash='checkout';};
  }
}

function cartPage(){
  document.title='Your cart — Rooster Club Shop';
  // drop items that went out of stock or left the shop
  const c=cart().filter(l=>inStock(byId(l.id))&&canBuy(byId(l.id))).map(l=>({id:l.id,qty:Math.min(l.qty,byId(l.id).stock_count,MAX_QTY)}));
  saveCart(c);
  const lines=cartLines();
  if(!lines.length){ main.innerHTML='<div class="wrap narrow"><div class="box center"><h1>Your cart is empty</h1><p class="muted">Pick something from the shop to get started.</p><a class="btn" href="#">Go to the shop</a></div></div>'; return; }
  const t=totals(lines);
  main.innerHTML='<div class="wrap narrow"><h1 class="ptitle">Your cart</h1><div class="box">'
    +lines.map(({l,p})=>'<div class="cline"><img src="'+esc(pics(p)[0])+'" alt=""><div class="cmid"><a href="#p/'+esc(p.id)+'">'+esc(p.name)+'</a><span>'+money(p.price)+' each</span>'
      +'<div class="qty sm"><button data-id="'+esc(p.id)+'" data-d="-1" aria-label="Less">−</button><span>'+l.qty+'</span><button data-id="'+esc(p.id)+'" data-d="1" aria-label="More">+</button></div></div>'
      +'<div class="cend"><b>'+money(p.price*l.qty)+'</b><button class="link" data-rm="'+esc(p.id)+'">Remove</button></div></div>').join('')
    +sumBlock(t)
    +'<a class="btn wide" href="#checkout">Checkout</a></div>'
    +'<a class="back" href="#">← Keep shopping</a></div>';
  main.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{const l=cart().find(x=>x.id===b.dataset.id);setQty(b.dataset.id,(l?l.qty:0)+Number(b.dataset.d));cartPage();});
  main.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{setQty(b.dataset.rm,0);cartPage();});
}

function sumBlock(t,label){
  return '<div class="sum"><div><span>Items</span><span>'+money(t.sub)+'</span></div>'
    +'<div><span>Delivery</span><span>'+(t.fee?money(t.fee):'Free')+'</span></div>'
    +(t.fee?'<p class="hint">Add '+money(FREE_DELIVERY-t.sub)+' more for free delivery.</p>':'')
    +'<div class="tot"><span>'+(label||'Total')+'</span><span>'+money(t.total)+'</span></div></div>';
}

async function checkoutPage(teeMode){
  document.title='Checkout — Rooster Club Shop';
  if(!teeMode) ONLINE=null;
  if(ONLINE===null){ try{ONLINE=!!((await rpc('web_shop_pay_options',{}))||{}).online}catch(e){ONLINE=false} }
  let lines;
  if(teeMode){
    let tee=null; try{tee=JSON.parse(sessionStorage.getItem(TEE_KEY))}catch(e){}
    if(!tee||!tee.variant_id){ location.hash=''; return; }
    lines=[{l:{id:tee.id,qty:tee.qty,variant_id:tee.variant_id},p:{name:tee.name,price:tee.price,delivery_included:true}}];
    let T2=false; try{T2=!!((await rpc('web_shop_pay_options',{}))||{}).tees}catch(e){}
    if(T2) ONLINE=true; else ONLINE=null;
    if(!T2){ main.innerHTML='<div class="wrap narrow"><div class="box center"><h1>Online payment opens soon</h1><p class="muted">T-shirts are paid online only.</p><a class="btn" href="#p/'+esc(tee.id)+'">Back</a></div></div>'; return; }
  } else {
    lines=cartLines().filter(({p})=>inStock(p));
    if(!lines.length){ location.hash='cart'; return; }
  }
  const t=totals(lines), a=store.get(ADDR_KEY,{});
  const f=(id,label,attrs)=>'<label class="fld"><span>'+label+'</span><input id="'+id+'" value="'+esc(a[id]||'')+'" '+(attrs||'')+'></label>';
  main.innerHTML='<div class="wrap narrow"><h1 class="ptitle">Delivery details</h1>'
    +'<form class="box" id="co" novalidate>'
    +f('name','Full name','autocomplete="name" maxlength="60" required')
    +f('phone','Mobile number','type="tel" inputmode="numeric" autocomplete="tel" maxlength="17" placeholder="10-digit mobile" required')
    +f('address_line','House, street, landmark','autocomplete="street-address" maxlength="300" required')
    +'<div class="two">'+f('village','Village / town','maxlength="60"')+f('mandal','Mandal / taluk','maxlength="60"')+'</div>'
    +'<div class="two">'+f('district','District','maxlength="60" required')
      +'<label class="fld"><span>State</span><select id="state" required><option value="">Choose</option>'+STATES.map(s=>'<option'+(a.state===s?' selected':'')+'>'+esc(s)+'</option>').join('')+'</select></label></div>'
    +f('pincode','Pincode','inputmode="numeric" maxlength="6" autocomplete="postal-code" required')
    +f('note','Note for us (optional)','maxlength="300"')
    +'<h2>Your order</h2>'
    +lines.map(({l,p})=>'<div class="oline"><span>'+esc(p.name)+' × '+l.qty+'</span><span>'+money(p.price*l.qty)+'</span></div>').join('')
    +sumBlock(t,'Total')
    +(teeMode?'<p class="pay-note"><b>Pay online now.</b> UPI, debit/credit card or net banking — secure payment by CCAvenue. Printed T-shirts are not sent cash on delivery.</p>'
     :ONLINE?'<h2>Payment</h2><div class="paychoice">'
      +'<label class="pc"><input type="radio" name="pay" value="online" checked><span><b>Pay online now</b><small>UPI, debit/credit card or net banking — secure payment by CCAvenue</small></span></label>'
      +'<label class="pc"><input type="radio" name="pay" value="cod"><span><b>Cash on delivery</b><small>Pay the delivery person when the parcel arrives</small></span></label></div>'
      :'<p class="pay-note"><b>Cash on delivery.</b> Pay the delivery person in cash or UPI when the parcel arrives. We will call you on this number to confirm the order.</p>')
    +'<p class="err" id="err" hidden></p>'
    +'<button class="btn wide" id="place" type="submit">Place order · '+money(t.total)+'</button>'
    +'<p class="fine">By placing the order you agree to our <a href="/terms.html">Terms</a>, <a href="/refund-policy.html">Refund Policy</a>, <a href="/shipping-policy.html">Shipping Policy</a> and <a href="/privacy.html">Privacy Policy</a>.</p>'
    +'</form><a class="back" href="'+(teeMode?'#p/'+esc(lines[0].l.id):'#cart')+'">← Back</a></div>';
  document.getElementById('co').onsubmit=async e=>{
    e.preventDefault();
    const v=id=>document.getElementById(id).value.trim();
    const contact={name:v('name'),phone:v('phone'),address_line:v('address_line'),village:v('village'),mandal:v('mandal'),district:v('district'),state:v('state'),pincode:v('pincode'),note:v('note')};
    const pc=document.querySelector('input[name=pay]:checked'), online=!!(ONLINE&&(teeMode||(pc&&pc.value==='online')));
    const err=document.getElementById('err'), btn=document.getElementById('place');
    const bad=checkContact(contact);
    if(bad){err.textContent=bad;err.hidden=false;return;}
    err.hidden=true; btn.disabled=true; btn.textContent='Placing your order…';
    store.set(ADDR_KEY,Object.assign({},contact,{note:''}));
    try{
      const r=await rpc('web_place_shop_order',{p_items:lines.map(({l})=>Object.assign({product_id:l.id,qty:l.qty},l.variant_id?{variant_id:l.variant_id}:{})),p_contact:Object.assign({},contact,online?{pay:'online'}:{})});
      const list=store.get(ORDERS_KEY,[]); list.unshift({token:r.token,order_no:r.order_no,at:Date.now()}); store.set(ORDERS_KEY,list.slice(0,30));
      if(teeMode){ try{sessionStorage.removeItem(TEE_KEY)}catch(e){} } else saveCart([]);
      PRODUCTS=null;
      if(online&&r.status==='awaiting_payment'){
        btn.textContent='Opening secure payment…';
        try{ await startPay(r.token); return; }catch(pe){ location.hash='o/'+r.token+'/failed'; return; }
      }
      location.hash='o/'+r.token+'/new';
    }catch(ex){
      err.textContent=ex.message; err.hidden=false; btn.disabled=false; btn.textContent='Place order · '+money(t.total);
      if(ex.server){ PRODUCTS=null; await loadProducts(); }
    }
  };
}

async function startPay(token){
  const r=await fetch(PAY_FN,{method:'POST',headers:{'Content-Type':'application/json',apikey:KEY},body:JSON.stringify({token})});
  const b=await r.json().catch(()=>({}));
  if(!r.ok||!b.url) throw new Error(b.error||'Online payment could not start. Please try again.');
  const f=document.createElement('form'); f.method='POST'; f.action=b.url;
  [['encRequest',b.encRequest],['access_code',b.access_code]].forEach(([n,v])=>{const i=document.createElement('input');i.type='hidden';i.name=n;i.value=v;f.appendChild(i);});
  document.body.appendChild(f); f.submit();
}

function checkContact(c){
  const ph=c.phone.replace(/\D/g,'').replace(/^91(?=\d{10}$)/,'');
  if(c.name.length<2) return 'Enter your full name.';
  if(!/^[6-9]\d{9}$/.test(ph)) return 'Enter a valid 10-digit mobile number.';
  if(c.address_line.length<8) return 'Enter your full address (house, street, landmark).';
  if(!c.district) return 'Enter your district.';
  if(!c.state) return 'Choose your state.';
  if(!/^[1-9]\d{5}$/.test(c.pincode)) return 'Enter a valid 6-digit pincode.';
  return '';
}

async function orderPage(token,tag){
  const isNew=tag==='new';
  document.title='Your order — Rooster Club Shop';
  main.innerHTML='<div class="wrap narrow"><p class="shop-loading">Loading your order…</p></div>';
  let o=null; try{o=await rpc('web_shop_order',{p_token:token})}catch(e){}
  if(!o){ main.innerHTML='<div class="wrap narrow"><div class="box center"><h1>Order not found</h1><p class="muted">Check the link, or WhatsApp us your order number.</p><a class="btn" href="https://wa.me/'+WA+'">WhatsApp us</a></div></div>'; return; }
  const idx=STEPS.findIndex(s=>s[0]===o.status);
  const track=o.status==='cancelled'?'':'<ol class="track">'+STEPS.map((s,i)=>'<li class="'+(idx>=0&&i<=idx?'done':'')+'">'+s[1]+'</li>').join('')+'</ol>';
  const items=(o.items||[]).map(i=>'<div class="cline"><img src="'+esc(safeUrl(i.image_url))+'" alt=""><div class="cmid"><b>'+esc(i.name)+'</b><span>'+money(i.unit_price)+' × '+i.qty+'</span></div><div class="cend"><b>'+money(i.line_total)+'</b></div></div>').join('');
  const pay=o.pay?payBlock(o):'';
  main.innerHTML='<div class="wrap narrow">'
    +((isNew||(tag==='paid'&&o.paid))?'<div class="placed"><b>Thank you, '+esc(o.name)+'!</b> '+(o.paid?'Payment received. ':'')+'Your order is placed. Save this page to check on it later.</div>':'')
    +(tag==='failed'&&!o.paid&&o.status==='awaiting_payment'?'<div class="paybox"><b>Payment did not go through.</b><p>No money was taken'+(o.ccav_fail_reason?' ('+esc(o.ccav_fail_reason)+')':'')+'. You can try again below.</p></div>':'')
    +'<div class="box"><div class="ohead"><div><span class="muted">Order</span><h1>'+esc(o.order_no)+'</h1></div><span class="ostatus s-'+esc(o.status)+'">'+esc((STEPS.find(s=>s[0]===o.status)||[0,o.status.replace('_',' ')])[1])+'</span></div>'
    +'<p class="otext">'+esc(STATUS_TEXT[o.status]||'')+(o.cancel_reason?' '+esc(o.cancel_reason):'')+'</p>'
    +track
    +(o.tracking_no?'<p class="otrack">Courier: <b>'+esc(o.courier||'')+'</b> · Tracking no. <b>'+esc(o.tracking_no)+'</b></p>':'')
    +pay
    +'<h2>Items</h2>'+items
    +'<div class="sum"><div><span>Items</span><span>'+money(o.subtotal)+'</span></div>'
    +(o.discount?'<div><span>Discount</span><span>−'+money(o.discount)+'</span></div>':'')
    +'<div><span>Delivery</span><span>'+(o.delivery_fee?money(o.delivery_fee):'Free')+'</span></div>'
    +'<div class="tot"><span>'+(o.payment_method==='cod'&&o.status!=='cancelled'&&o.status!=='delivered'?'Pay on delivery':'Total')+'</span><span>'+money(o.total)+'</span></div></div>'
    +'<h2>Delivering to</h2><p>'+esc(o.name)+' · mobile ending '+esc(o.phone_last4)+'<br>'+esc(o.place)+'</p>'
    +'<a class="btn ghost wide" href="https://wa.me/'+WA+'?text='+encodeURIComponent('Hi, I need help with my order '+o.order_no)+'">Help with this order on WhatsApp</a>'
    +'</div><a class="back" href="#">← Keep shopping</a></div>';
  const pb=document.getElementById('paynow');
  if(pb) pb.onclick=async()=>{ const er=document.getElementById('payerr'); pb.disabled=true; pb.textContent='Opening secure payment…';
    try{ await startPay(token); }catch(ex){ er.textContent=ex.message; er.hidden=false; pb.disabled=false; pb.textContent='Pay '+money(o.total)+' now'; } };
  const f=document.getElementById('payf');
  if(f) f.onsubmit=async e=>{
    e.preventDefault(); const ref=document.getElementById('upiref').value.trim(), er=document.getElementById('payerr');
    try{ await rpc('web_submit_shop_payment',{p_token:token,p_ref:ref}); orderPage(token,false); }
    catch(ex){ er.textContent=ex.message; er.hidden=false; }
  };
}

function payBlock(o){
  const p=o.pay;
  if(o.status==='payment_review') return '<div class="paybox"><b>Payment reference received: '+esc(o.upi_ref||'')+'</b><p>We will confirm your order as soon as we see the money.</p></div>';
  if(o.payment_method==='ccavenue'){
    let by2=''; try{by2=new Date(p.pay_by).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'})}catch(e){}
    if(!p.online) return '<div class="paybox"><p>Online payment is not open right now. Please WhatsApp us about this order.</p></div>';
    return '<div class="paybox"><b>Pay '+money(o.total)+' online'+(by2?' before '+esc(by2):'')+'</b><p>UPI, card or net banking. If not paid in time, the order is cancelled.</p>'
      +'<p class="err" id="payerr" hidden></p><button class="btn wide" id="paynow" type="button">Pay '+money(o.total)+' now</button></div>';
  }
  if(!p.upi_id) return '<div class="paybox"><p>Online payment is not open right now. Please WhatsApp us about this order.</p></div>';
  const link='upi://pay?pa='+encodeURIComponent(p.upi_id)+'&pn='+encodeURIComponent(p.payee_name)+'&am='+o.total+'&cu=INR&tn='+encodeURIComponent(o.order_no);
  let by=''; try{by=new Date(p.pay_by).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'})}catch(e){}
  return '<div class="paybox"><b>Pay '+money(o.total)+' by UPI'+(by?' before '+esc(by):'')+'</b>'
    +'<p>UPI ID: <b>'+esc(p.upi_id)+'</b> ('+esc(p.payee_name)+')</p>'
    +'<a class="btn wide" href="'+esc(link)+'">Pay with a UPI app</a>'
    +'<form id="payf" class="payf"><label class="fld"><span>After paying, type the 12-digit UPI reference number</span><input id="upiref" inputmode="numeric" maxlength="30"></label>'
    +'<p class="err" id="payerr" hidden></p><button class="btn ghost wide" type="submit">I have paid</button></form></div>';
}

function myOrdersPage(){
  document.title='My orders — Rooster Club Shop';
  const list=store.get(ORDERS_KEY,[]);
  main.innerHTML='<div class="wrap narrow"><h1 class="ptitle">My orders</h1><div class="box">'
    +(list.length?list.map(x=>'<a class="olink" href="#o/'+esc(x.token)+'"><b>'+esc(x.order_no)+'</b><span>'+new Date(x.at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})+'</span></a>').join('')
      :'<p class="muted">Orders you place on this phone or computer show here.</p>')
    +'</div><p class="fine">Ordered on another device? Open the link from that device, or WhatsApp us your order number.</p><a class="back" href="#">← Keep shopping</a></div>';
}

/* ---------- router ---------- */
async function route(){
  const h=decodeURIComponent(location.hash.slice(1));
  window.scrollTo(0,0);
  document.getElementById('navlinks').classList.remove('open');
  try{
    let m;
    if((m=h.match(/^o\/([0-9a-f-]{36})(?:\/(new|paid|failed))?$/))){ paintCartCount(); return orderPage(m[1],m[2]||''); }
    if(h==='orders'){ paintCartCount(); return myOrdersPage(); }
    await loadProducts();
    if((m=h.match(/^p\/([0-9a-f-]{36})$/))) productPage(m[1]);
    else if((m=h.match(/^c\/([a-z0-9-]+)$/))) soonPage(m[1]);
    else if(h==='cart') cartPage();
    else if(h==='checkout') checkoutPage(false);
    else if(h==='checkout/tee') checkoutPage(true);
    else if((m=h.match(/^(sec-[a-z_]+|cats)$/))){ listPage(); const t=document.getElementById(m[1]); if(t) setTimeout(()=>t.scrollIntoView(),0); }
    else listPage();
  }catch(e){
    main.innerHTML='<div class="wrap narrow"><div class="box center"><h1>The shop could not load</h1><p class="muted">Check your internet and try again.</p><button class="btn" onclick="location.reload()">Try again</button></div></div>';
  }
  paintCartCount();
}
window.addEventListener('hashchange',route);
route();
})();
