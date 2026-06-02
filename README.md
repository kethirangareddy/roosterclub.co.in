[index.html](https://github.com/user-attachments/files/28529437/index.html)
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="description" content="Rooster Club — India's #1 Rooster Marketplace for Aseel and country bird breeders in AP and Telangana. Free listings. Zero commission."/>
<title>Rooster Club — India's #1 Rooster Marketplace</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"/>
<style>
:root{
  --dark:#1C0A00;
  --amber:#BA7517;
  --amber-l:#EF9F27;
  --amber-bg:#FAEEDA;
  --teal:#1D9E75;
  --teal-bg:#E1F5EE;
  --white:#FFFFFF;
  --off:#FAFAF8;
  --gray:#666;
  --gray-l:#999;
  --border:#E8E2D8;
  --text:#1a1a1a;
}
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:var(--white);color:var(--text);overflow-x:hidden;}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,0.97);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 5vw;display:flex;align-items:center;justify-content:space-between;height:68px;transition:box-shadow .3s;}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;}
.nav-logo-ic{width:38px;height:38px;border-radius:10px;background:var(--dark);display:flex;align-items:center;justify-content:center;}
.nav-logo-name{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:var(--dark);line-height:1;}
.nav-logo-tag{font-size:10px;color:var(--amber);font-weight:500;letter-spacing:.4px;}
.nav-links{display:flex;align-items:center;gap:32px;}
.nav-links a{color:var(--gray);text-decoration:none;font-size:14px;transition:color .2s;}
.nav-links a:hover{color:var(--amber);}
.nav-cta{background:var(--dark);color:var(--white);padding:10px 22px;border-radius:8px;font-size:14px;font-weight:500;text-decoration:none;display:flex;align-items:center;gap:7px;transition:all .2s;border:1.5px solid var(--dark);}
.nav-cta:hover{background:var(--amber);border-color:var(--amber);transform:translateY(-1px);}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px;}
.hamburger span{display:block;width:22px;height:2px;background:var(--dark);border-radius:2px;}

/* MOBILE NAV */
.mobile-nav{display:none;position:fixed;top:68px;left:0;right:0;background:rgba(255,255,255,0.99);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:20px 5vw 28px;z-index:99;flex-direction:column;}
.mobile-nav.open{display:flex;}
.mobile-nav a{color:var(--gray);text-decoration:none;font-size:15px;padding:13px 0;border-bottom:1px solid var(--border);}
.mobile-nav a:last-child{border-bottom:none;color:var(--amber);font-weight:600;margin-top:6px;}

/* HERO */
.hero{min-height:100vh;background:var(--white);display:flex;align-items:center;padding:100px 5vw 60px;position:relative;overflow:hidden;}
.hero-bg-dot{position:absolute;top:0;left:0;right:0;bottom:0;background-image:radial-gradient(var(--border) 1.2px,transparent 1.2px);background-size:28px 28px;opacity:.5;pointer-events:none;}
.hero-bg-glow{position:absolute;top:-100px;right:-100px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(186,117,23,0.06) 0%,transparent 65%);pointer-events:none;}
.hero-inner{max-width:1200px;margin:0 auto;width:100%;display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center;}
.hero-badge{display:inline-flex;align-items:center;gap:7px;background:var(--teal-bg);border:1px solid rgba(29,158,117,0.25);border-radius:30px;padding:5px 14px;font-size:12px;color:var(--teal);font-weight:500;margin-bottom:24px;}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--teal);animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(1.3);}}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(42px,5.5vw,72px);font-weight:800;color:var(--dark);line-height:1.05;margin-bottom:12px;}
.hero h1 em{color:var(--amber);font-style:normal;}
.hero-sub{font-size:clamp(15px,1.6vw,17px);color:var(--gray);line-height:1.8;margin-bottom:32px;font-weight:300;max-width:520px;}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:48px;}
.btn-dark{background:var(--dark);color:var(--white);padding:14px 26px;border-radius:10px;font-size:15px;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .25s;border:1.5px solid var(--dark);}
.btn-dark:hover{background:var(--amber);border-color:var(--amber);transform:translateY(-2px);box-shadow:0 8px 24px rgba(186,117,23,0.2);}
.btn-outline{background:transparent;color:var(--dark);padding:14px 26px;border-radius:10px;font-size:15px;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .25s;border:1.5px solid var(--border);}
.btn-outline:hover{border-color:var(--amber);color:var(--amber);transform:translateY(-2px);}
.hero-stats{display:flex;gap:36px;flex-wrap:wrap;}
.hs-val{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:700;color:var(--dark);}
.hs-lbl{font-size:11px;color:var(--gray-l);text-transform:uppercase;letter-spacing:.5px;margin-top:2px;}

/* HERO RIGHT — stat cards */
.hero-right{display:flex;flex-direction:column;gap:14px;}
.hero-card{background:var(--white);border:1px solid var(--border);border-radius:16px;padding:18px 20px;display:flex;align-items:center;gap:14px;transition:all .3s;box-shadow:0 2px 12px rgba(0,0,0,0.04);}
.hero-card:hover{border-color:var(--amber);transform:translateX(4px);}
.hc-ic{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:22px;}
.hc-title{font-size:14px;font-weight:600;color:var(--dark);}
.hc-sub{font-size:12px;color:var(--gray);margin-top:2px;}
.hc-badge{margin-left:auto;font-size:11px;font-weight:500;padding:3px 9px;border-radius:20px;flex-shrink:0;}

/* SECTION */
section{padding:88px 5vw;}
.sec-wrap{max-width:1200px;margin:0 auto;}
.sec-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:2px;color:var(--amber);margin-bottom:10px;}
.sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,3.5vw,46px);font-weight:700;color:var(--dark);line-height:1.2;margin-bottom:14px;}
.sec-sub{font-size:15px;color:var(--gray);line-height:1.75;max-width:560px;font-weight:300;}
.divider{height:1px;background:var(--border);}

/* HOW */
.how{background:var(--off);}
.how-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin-top:52px;}
.how-card{background:var(--white);border-radius:16px;padding:28px 24px;border:1px solid var(--border);position:relative;transition:all .25s;overflow:hidden;}
.how-card:hover{transform:translateY(-4px);box-shadow:0 12px 28px rgba(0,0,0,0.07);border-color:var(--amber);}
.how-n{font-family:'Cormorant Garamond',serif;font-size:64px;font-weight:700;color:var(--amber-bg);position:absolute;top:8px;right:16px;line-height:1;}
.how-ic{width:50px;height:50px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:18px;position:relative;z-index:1;}
.how-title{font-size:15px;font-weight:600;color:var(--dark);margin-bottom:8px;}
.how-desc{font-size:13px;color:var(--gray);line-height:1.7;}

/* CATEGORIES */
.cats{background:var(--white);}
.cat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:52px;}
@media(max-width:900px){.cat-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:600px){.cat-grid{grid-template-columns:repeat(2,1fr);}}
.cat-card{border-radius:16px;padding:26px 16px;text-align:center;cursor:pointer;transition:all .25s;border:1.5px solid var(--border);background:var(--white);}
.cat-card:hover{transform:translateY(-4px);border-color:var(--amber);box-shadow:0 8px 24px rgba(186,117,23,0.1);}
.cat-icon-box{width:68px;height:68px;border-radius:18px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;}
.cat-icon-box i{font-size:32px;}
.cat-name{font-size:14px;font-weight:600;color:var(--dark);margin-bottom:4px;}
.cat-sub{font-size:11px;color:var(--gray-l);line-height:1.4;}

/* FEATURES */
.features{background:var(--off);}
.feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:52px;}
.feat-card{background:var(--white);padding:24px;border-radius:14px;border:1px solid var(--border);display:flex;gap:15px;align-items:flex-start;transition:all .25s;}
.feat-card:hover{border-color:var(--amber);box-shadow:0 4px 16px rgba(186,117,23,0.08);}
.feat-ic{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:20px;}
.feat-ic i{font-size:22px;}
.feat-title{font-size:14px;font-weight:600;color:var(--dark);margin-bottom:5px;}
.feat-desc{font-size:13px;color:var(--gray);line-height:1.65;}

/* COMMUNITY BAND */
.band{background:var(--dark);padding:56px 5vw;overflow:hidden;position:relative;}
.band-glow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:600px;height:300px;border-radius:50%;background:radial-gradient(ellipse,rgba(186,117,23,0.1) 0%,transparent 65%);pointer-events:none;}
.band-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;position:relative;}
.band-text{flex:1;min-width:280px;}
.band-title{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,3vw,40px);font-weight:700;color:var(--white);line-height:1.2;margin-bottom:10px;}
.band-title em{color:var(--amber-l);font-style:normal;}
.band-sub{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;max-width:420px;}
.band-stats{display:flex;gap:24px;flex-wrap:wrap;}
.bstat{background:rgba(255,255,255,0.05);border:1px solid rgba(186,117,23,0.15);border-radius:14px;padding:18px 22px;text-align:center;min-width:110px;}
.bstat-val{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:var(--amber-l);}
.bstat-lbl{font-size:11px;color:rgba(255,255,255,0.4);margin-top:3px;text-transform:uppercase;letter-spacing:.4px;}

/* TESTIMONIALS */
.testimonials{background:var(--white);}
.test-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-top:52px;}
.test-card{background:var(--off);border-radius:16px;padding:24px;border:1px solid var(--border);transition:all .25s;}
.test-card:hover{border-color:var(--amber);}
.test-stars{color:var(--amber-l);font-size:14px;letter-spacing:2px;margin-bottom:12px;}
.test-text{font-size:13px;color:#444;line-height:1.8;margin-bottom:16px;font-style:italic;}
.test-author{display:flex;align-items:center;gap:10px;}
.test-av{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:var(--white);flex-shrink:0;}
.test-name{font-size:13px;font-weight:600;color:var(--dark);}
.test-loc{font-size:11px;color:var(--gray-l);margin-top:2px;}

/* CTA */
.cta-section{background:var(--dark);padding:88px 5vw;text-align:center;position:relative;overflow:hidden;}
.cta-bg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(186,117,23,0.1) 0%,transparent 65%);pointer-events:none;}
.cta-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(29,158,117,0.15);border:1px solid rgba(29,158,117,0.3);border-radius:30px;padding:5px 14px;font-size:12px;color:#5DCAA5;font-weight:500;margin-bottom:20px;}
.cta-title{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,5vw,58px);font-weight:700;color:var(--white);margin-bottom:14px;position:relative;}
.cta-title em{color:var(--amber-l);font-style:normal;}
.cta-sub{font-size:16px;color:rgba(255,255,255,0.5);margin-bottom:36px;max-width:480px;margin-left:auto;margin-right:auto;}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.btn-amber{background:var(--amber);color:var(--white);padding:15px 30px;border-radius:10px;font-size:15px;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .25s;}
.btn-amber:hover{background:var(--amber-l);transform:translateY(-2px);box-shadow:0 8px 24px rgba(186,117,23,0.35);}
.btn-wa{background:#25D366;color:var(--white);padding:15px 30px;border-radius:10px;font-size:15px;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .25s;}
.btn-wa:hover{background:#20c05a;transform:translateY(-2px);}
.cta-note{color:rgba(255,255,255,0.2);font-size:12px;margin-top:20px;position:relative;}

/* FOOTER */
footer{background:#0E0500;padding:56px 5vw 28px;}
.footer-inner{max-width:1200px;margin:0 auto;}
.footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px;}
@media(max-width:900px){.footer-top{grid-template-columns:1fr 1fr;gap:32px;}}
@media(max-width:500px){.footer-top{grid-template-columns:1fr;}}
.footer-brand{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
.footer-brand-ic{width:36px;height:36px;border-radius:9px;background:var(--amber);display:flex;align-items:center;justify-content:center;}
.footer-brand-name{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:var(--white);}
.footer-desc{font-size:13px;color:rgba(255,255,255,0.35);line-height:1.75;max-width:260px;margin-bottom:0;}
.footer-col h4{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.3);margin-bottom:16px;}
.footer-col a{display:block;font-size:13px;color:rgba(255,255,255,0.5);text-decoration:none;margin-bottom:10px;transition:color .2s;}
.footer-col a:hover{color:var(--amber-l);}
.footer-bottom{border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
.footer-copy{font-size:12px;color:rgba(255,255,255,0.2);}
.footer-domain{font-size:12px;color:var(--amber);font-weight:500;}

/* ANIMATIONS */
.fade-in{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease;}
.fade-in.visible{opacity:1;transform:translateY(0);}
.fade-in-d1{transition-delay:.1s;}
.fade-in-d2{transition-delay:.2s;}
.fade-in-d3{transition-delay:.3s;}

@media(max-width:900px){
  .nav-links,.nav-cta{display:none;}
  .hamburger{display:flex;}
  .hero-inner{grid-template-columns:1fr;text-align:center;gap:40px;}
  .hero-left{order:2;}
  .hero-right{order:1;}
  .hero-sub{margin-left:auto;margin-right:auto;}
  .hero-btns{justify-content:center;}
  .hero-stats{justify-content:center;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav id="mainNav">
  <a href="#" class="nav-logo">
    <div class="nav-logo-ic">
      <i class="ti ti-feather" style="font-size:18px;color:#EF9F27;"></i>
    </div>
    <div>
      <div class="nav-logo-name">Rooster Club</div>
      <div class="nav-logo-tag">India's #1 Rooster Marketplace</div>
    </div>
  </a>
  <div class="nav-links">
    <a href="#how">How it works</a>
    <a href="#categories">Categories</a>
    <a href="#features">Features</a>
    <a href="#download">Download</a>
  </div>
  <a href="https://wa.me/919515369756" target="_blank" class="nav-cta">
    <i class="ti ti-brand-whatsapp" style="font-size:16px;"></i> WhatsApp us
  </a>
  <button class="hamburger" onclick="toggleNav()" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="mobile-nav" id="mobileNav">
  <a href="#how" onclick="closeNav()">How it works</a>
  <a href="#categories" onclick="closeNav()">Categories</a>
  <a href="#features" onclick="closeNav()">Features</a>
  <a href="#download" onclick="closeNav()">Download</a>
  <a href="https://wa.me/919515369756" target="_blank" onclick="closeNav()">
    <i class="ti ti-brand-whatsapp"></i> WhatsApp us →
  </a>
</div>

<!-- HERO -->
<section class="hero" id="home">
  <div class="hero-bg-dot"></div>
  <div class="hero-bg-glow"></div>
  <div class="hero-inner">
    <div class="hero-left">
      <div class="hero-badge">
        <span class="hero-badge-dot"></span>
        Now live in AP & Telangana
      </div>
      <h1>India's <em>#1</em><br/>Rooster<br/>Marketplace</h1>
      <p class="hero-sub">Buy, sell and connect with <strong>Aseel and country bird breeders</strong> across Andhra Pradesh and Telangana. Free listings. Zero commission. Direct contact.</p>
      <div class="hero-btns">
        <a href="#download" class="btn-dark">
          <i class="ti ti-device-mobile-down" style="font-size:17px;"></i> List your birds free
        </a>
        <a href="https://wa.me/919515369756" target="_blank" class="btn-outline">
          <i class="ti ti-brand-whatsapp" style="font-size:17px;"></i> WhatsApp us
        </a>
      </div>
      <div class="hero-stats">
        <div class="hs"><div class="hs-val">14,800+</div><div class="hs-lbl">Breeders in network</div></div>
        <div class="hs"><div class="hs-val">₹0</div><div class="hs-lbl">Commission</div></div>
        <div class="hs"><div class="hs-val">AP & TG</div><div class="hs-lbl">Both states</div></div>
      </div>
    </div>
    <div class="hero-right">
      <div class="hero-card fade-in">
        <div class="hc-ic" style="background:#FAEEDA;">
          <i class="ti ti-sword" style="color:#854F0B;font-size:22px;"></i>
        </div>
        <div>
          <div class="hc-title">Pure Aseel Fighter</div>
          <div class="hc-sub">Ravi Kumar · Nizamabad</div>
        </div>
        <div class="hc-badge" style="background:#FAEEDA;color:#854F0B;">₹12,500</div>
      </div>
      <div class="hero-card fade-in fade-in-d1">
        <div class="hc-ic" style="background:#E1F5EE;">
          <i class="ti ti-feather" style="color:#0F6E56;font-size:22px;"></i>
        </div>
        <div>
          <div class="hc-title">Aseel Breeder Stag</div>
          <div class="hc-sub">Suresh · Warangal</div>
        </div>
        <div class="hc-badge" style="background:#E1F5EE;color:#085041;">₹8,500</div>
      </div>
      <div class="hero-card fade-in fade-in-d2">
        <div class="hc-ic" style="background:#EEEDFE;">
          <i class="ti ti-trophy" style="color:#534AB7;font-size:22px;"></i>
        </div>
        <div>
          <div class="hc-title">Show Bird Aseel</div>
          <div class="hc-sub">Vijay Breeds · Hyderabad</div>
        </div>
        <div class="hc-badge" style="background:#EEEDFE;color:#3C3489;">₹35,000</div>
      </div>
      <div class="hero-card fade-in fade-in-d3">
        <div class="hc-ic" style="background:#FFF8F0;">
          <i class="ti ti-egg" style="color:#854F0B;font-size:22px;"></i>
        </div>
        <div>
          <div class="hc-title">Fertile Eggs × 12</div>
          <div class="hc-sub">Pavan · Karimnagar</div>
        </div>
        <div class="hc-badge" style="background:#FFF8F0;color:#854F0B;">₹1,800</div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- HOW IT WORKS -->
<section class="how" id="how">
  <div class="sec-wrap">
    <div class="sec-label">Simple process</div>
    <h2 class="sec-title">How Rooster Club works</h2>
    <p class="sec-sub">List your birds in 2 minutes. Buyers contact you directly. No middlemen. No charges. Ever.</p>
    <div class="how-grid">
      <div class="how-card fade-in">
        <div class="how-n">01</div>
        <div class="how-ic" style="background:#FAEEDA;">
          <i class="ti ti-device-mobile-down" style="font-size:26px;color:#854F0B;"></i>
        </div>
        <div class="how-title">Download the app</div>
        <div class="how-desc">Free on Android. OTP login. No complex signup. Ready in 60 seconds.</div>
      </div>
      <div class="how-card fade-in">
        <div class="how-n">02</div>
        <div class="how-ic" style="background:#E1F5EE;">
          <i class="ti ti-camera-plus" style="font-size:26px;color:#0F6E56;"></i>
        </div>
        <div class="how-title">List your bird</div>
        <div class="how-desc">Upload photos, add breed, age, weight, price, health status. Live in 2 minutes.</div>
      </div>
      <div class="how-card fade-in">
        <div class="how-n">03</div>
        <div class="how-ic" style="background:#E6F1FB;">
          <i class="ti ti-message-circle" style="font-size:26px;color:#185FA5;"></i>
        </div>
        <div class="how-title">Buyers message you</div>
        <div class="how-desc">Buyers chat directly on the app. Every chat is linked to the exact bird listing.</div>
      </div>
      <div class="how-card fade-in">
        <div class="how-n">04</div>
        <div class="how-ic" style="background:#EAF3DE;">
          <i class="ti ti-handshake" style="font-size:26px;color:#27500A;"></i>
        </div>
        <div class="how-title">Complete the sale</div>
        <div class="how-desc">Agree on price and delivery. Bus parcel, railways, or pickup — your choice.</div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- CATEGORIES -->
<section class="cats" id="categories">
  <div class="sec-wrap">
    <div class="sec-label">What you can list</div>
    <h2 class="sec-title">Every category covered</h2>
    <p class="sec-sub">From champion Aseel fighters to fertile eggs — the most complete rooster marketplace in AP and TG.</p>
    <div class="cat-grid">

      <div class="cat-card fade-in">
        <div class="cat-icon-box" style="background:#FAEEDA;">
          <i class="ti ti-sword" style="font-size:32px;color:#854F0B;"></i>
        </div>
        <div class="cat-name">Fighter</div>
        <div class="cat-sub">Pure Aseel & imports</div>
      </div>

      <div class="cat-card fade-in">
        <div class="cat-icon-box" style="background:#E1F5EE;">
          <i class="ti ti-heart-handshake" style="font-size:32px;color:#0F6E56;"></i>
        </div>
        <div class="cat-name">Breeder</div>
        <div class="cat-sub">Proven bloodlines</div>
      </div>

      <div class="cat-card fade-in">
        <div class="cat-icon-box" style="background:#EEEDFE;">
          <i class="ti ti-shield-star" style="font-size:32px;color:#534AB7;"></i>
        </div>
        <div class="cat-name">Patta</div>
        <div class="cat-sub">Young fighter rooster</div>
      </div>

      <div class="cat-card fade-in">
        <div class="cat-icon-box" style="background:#FFF8F0;">
          <i class="ti ti-sun" style="font-size:32px;color:#F57F17;"></i>
        </div>
        <div class="cat-name">Chicks</div>
        <div class="cat-sub">Day-old & young birds</div>
      </div>

      <div class="cat-card fade-in">
        <div class="cat-icon-box" style="background:#FFF8F0;">
          <i class="ti ti-egg" style="font-size:32px;color:#854F0B;"></i>
        </div>
        <div class="cat-name">Eggs</div>
        <div class="cat-sub">Fertile & hatching</div>
      </div>

      <div class="cat-card fade-in">
        <div class="cat-icon-box" style="background:#E6F1FB;">
          <i class="ti ti-home-heart" style="font-size:32px;color:#0C447C;"></i>
        </div>
        <div class="cat-name">Layer</div>
        <div class="cat-sub">Active laying hens</div>
      </div>

      <div class="cat-card fade-in">
        <div class="cat-icon-box" style="background:#FCEBEB;">
          <i class="ti ti-trophy" style="font-size:32px;color:#A32D2D;"></i>
        </div>
        <div class="cat-name">Show Birds</div>
        <div class="cat-sub">Exhibition quality</div>
      </div>

      <div class="cat-card fade-in">
        <div class="cat-icon-box" style="background:#EAF3DE;">
          <i class="ti ti-building-store" style="font-size:32px;color:#27500A;"></i>
        </div>
        <div class="cat-name">Shop</div>
        <div class="cat-sub">Feed, medicine & more</div>
      </div>

    </div>
  </div>
</section>

<div class="divider"></div>

<!-- COMMUNITY BAND -->
<section class="band">
  <div class="band-glow"></div>
  <div class="band-inner">
    <div class="band-text">
      <div class="band-title">14,800+ breeders.<br/><em>One platform.</em></div>
      <p class="band-sub">From Nizamabad to Vijayawada, Warangal to Karimnagar — the entire AP and TG breeder community is coming together on Rooster Club. Be counted. Be heard.</p>
      <a href="https://wa.me/919515369756" target="_blank" class="btn-amber" style="margin-top:24px;display:inline-flex;">
        <i class="ti ti-brand-whatsapp" style="font-size:17px;"></i> Join the community
      </a>
    </div>
    <div class="band-stats">
      <div class="bstat"><div class="bstat-val">14,800+</div><div class="bstat-lbl">Breeders</div></div>
      <div class="bstat"><div class="bstat-val">AP & TG</div><div class="bstat-lbl">States covered</div></div>
      <div class="bstat"><div class="bstat-val">₹0</div><div class="bstat-lbl">To list</div></div>
      <div class="bstat"><div class="bstat-val">8</div><div class="bstat-lbl">Categories</div></div>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section class="features" id="features">
  <div class="sec-wrap">
    <div class="sec-label">Why Rooster Club</div>
    <h2 class="sec-title">Built for Telugu breeders</h2>
    <p class="sec-sub">Every feature designed around how real breeders in AP and TG actually buy and sell birds.</p>
    <div class="feat-grid">
      <div class="feat-card fade-in">
        <div class="feat-ic" style="background:#FAEEDA;"><i class="ti ti-rosette-discount" style="color:#854F0B;"></i></div>
        <div><div class="feat-title">Zero commission. Always.</div><div class="feat-desc">List unlimited birds free. Buyers contact you directly. We never take a cut from your sale.</div></div>
      </div>
      <div class="feat-card fade-in">
        <div class="feat-ic" style="background:#E1F5EE;"><i class="ti ti-message-2" style="color:#0F6E56;"></i></div>
        <div><div class="feat-title">In-app chat with listing</div><div class="feat-desc">Every conversation linked to the exact bird. No confusion, no lost messages.</div></div>
      </div>
      <div class="feat-card fade-in">
        <div class="feat-ic" style="background:#E6F1FB;"><i class="ti ti-shield-check" style="color:#185FA5;"></i></div>
        <div><div class="feat-title">Health badges</div><div class="feat-desc">Vaccinated, dewormed, vet certificate on every listing. Buyers see trust instantly.</div></div>
      </div>
      <div class="feat-card fade-in">
        <div class="feat-ic" style="background:#EEEDFE;"><i class="ti ti-truck-delivery" style="color:#534AB7;"></i></div>
        <div><div class="feat-title">All delivery options</div><div class="feat-desc">Bus parcel, railways, local transport, buyer collects, India wide — you choose.</div></div>
      </div>
      <div class="feat-card fade-in">
        <div class="feat-ic" style="background:#EAF3DE;"><i class="ti ti-map-pin-search" style="color:#27500A;"></i></div>
        <div><div class="feat-title">Shops & vets near you</div><div class="feat-desc">Find verified vets, feed shops, and sellers within 50 km of your location.</div></div>
      </div>
      <div class="feat-card fade-in">
        <div class="feat-ic" style="background:#FAEEDA;"><i class="ti ti-tractor" style="color:#854F0B;"></i></div>
        <div><div class="feat-title">Visit farm requests</div><div class="feat-desc">Buyers request farm visits or bird showings directly through the app.</div></div>
      </div>
      <div class="feat-card fade-in">
        <div class="feat-ic" style="background:#E1F5EE;"><i class="ti ti-star" style="color:#0F6E56;"></i></div>
        <div><div class="feat-title">Verified seller ratings</div><div class="feat-desc">Every completed sale generates a verified review. Build your reputation.</div></div>
      </div>
      <div class="feat-card fade-in">
        <div class="feat-ic" style="background:#FFF8F0;"><i class="ti ti-sparkles" style="color:#BA7517;"></i></div>
        <div><div class="feat-title">కుకుట శాస్త్రం · Coming soon</div><div class="feat-desc">Lucky days, breeding muhurtham, bird body signs — ancient Telugu wisdom in your pocket.</div></div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- TESTIMONIALS -->
<section class="testimonials">
  <div class="sec-wrap">
    <div class="sec-label">What breeders say</div>
    <h2 class="sec-title">Real breeders. Real results.</h2>
    <div class="test-grid">
      <div class="test-card fade-in">
        <div class="test-stars">★★★★★</div>
        <p class="test-text">"WhatsApp groups lo post cheste message lo poyindi. Rooster Club lo poste mana bird specific ga buyers ki kanipisthundi. Chala better platform."</p>
        <div class="test-author"><div class="test-av" style="background:#BA7517;">RK</div><div><div class="test-name">Ravi Kumar</div><div class="test-loc">Aseel breeder · Nizamabad</div></div></div>
      </div>
      <div class="test-card fade-in">
        <div class="test-stars">★★★★★</div>
        <p class="test-text">"Health badges feature chala useful. Buyer ki vaccinated, dewormed details instantly kanipisthundi. Trust build avutundi easily."</p>
        <div class="test-author"><div class="test-av" style="background:#0F6E56;">SK</div><div><div class="test-name">Suresh Kumar</div><div class="test-loc">Fighter bird seller · Karimnagar</div></div></div>
      </div>
      <div class="test-card fade-in">
        <div class="test-stars">★★★★★</div>
        <p class="test-text">"Fertile eggs ki buyers dorukutu ledu. App lo list chesthe Hyderabad nunchi order vacchindi. Safe ga vellayi. Excellent app!"</p>
        <div class="test-author"><div class="test-av" style="background:#534AB7;">PK</div><div><div class="test-name">Pavan Kumar</div><div class="test-loc">Egg seller · Warangal</div></div></div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section" id="download">
  <div class="cta-bg"></div>
  <div class="cta-badge">✓ Free forever · Zero commission · Zero subscription</div>
  <h2 class="cta-title">Start selling your birds<br/><em>today for free</em></h2>
  <p class="cta-sub">Join thousands of breeders across AP and Telangana on India's #1 rooster marketplace.</p>
  <div class="cta-btns">
    <a href="#" class="btn-amber" id="playStoreBtn">
      <i class="ti ti-brand-google-play" style="font-size:18px;"></i> Coming soon on Android
    </a>
    <a href="https://wa.me/919515369756" target="_blank" class="btn-wa">
      <i class="ti ti-brand-whatsapp" style="font-size:18px;"></i> WhatsApp +91 95153 69756
    </a>
  </div>
  <p class="cta-note">roosterclub.co.in · Android app launching soon · iOS coming later</p>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-brand">
          <div class="footer-brand-ic"><i class="ti ti-feather" style="font-size:18px;color:#fff;"></i></div>
          <div class="footer-brand-name">Rooster Club</div>
        </div>
        <p class="footer-desc">India's #1 dedicated marketplace for Aseel and country bird breeders in Andhra Pradesh and Telangana.</p>
      </div>
      <div class="footer-col">
        <h4>Marketplace</h4>
        <a href="#categories">Fighters</a>
        <a href="#categories">Breeders</a>
        <a href="#categories">Patta birds</a>
        <a href="#categories">Show Birds</a>
        <a href="#categories">Eggs & Chicks</a>
      </div>
      <div class="footer-col">
        <h4>App</h4>
        <a href="#how">How it works</a>
        <a href="#features">Features</a>
        <a href="#download">Download</a>
        <a href="#categories">Categories</a>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <a href="https://wa.me/919515369756" target="_blank">WhatsApp us</a>
        <a href="tel:+919515369756">+91 95153 69756</a>
        <a href="mailto:hello@roosterclub.co.in">hello@roosterclub.co.in</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2025 Rooster Club. All rights reserved. Made with ❤️ in Hyderabad.</div>
      <div class="footer-domain">roosterclub.co.in</div>
    </div>
  </div>
</footer>

<script>
function toggleNav(){document.getElementById('mobileNav').classList.toggle('open');}
function closeNav(){document.getElementById('mobileNav').classList.remove('open');}
document.addEventListener('click',(e)=>{
  const nav=document.getElementById('mobileNav');
  if(nav.classList.contains('open')&&!e.target.closest('nav')&&!e.target.closest('#mobileNav'))nav.classList.remove('open');
});
const obs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
window.addEventListener('scroll',()=>{
  document.getElementById('mainNav').style.boxShadow=window.scrollY>10?'0 2px 20px rgba(0,0,0,0.08)':'none';
});
</script>
</body>
</html>
