# Rooster Club website shop — Architecture (DRAFT, waiting for Ranga's OK)

Last updated: 27 Nov 2026. Update this file at the end of every build phase.

## 1. What we are building
A new, faster, better-selling shop at **roosterclub.co.in/shop** that replaces the current
`shop/index.html` + `assets/shop.js`. Same products, same orders, same Supabase database as the
app Shop — nothing is duplicated. The rest of the website (home, blog, /u/ profile pages,
policies) is NOT touched.

## 2. Brand and design
| Item | Value (taken from the current site) |
|---|---|
| Brand | Rooster Club |
| Sells | Poultry accessories (incubators, brooder kits, BSF and azolla kits), feed, feed supplements, nutri laddus, T-shirts |
| For | Backyard and country-chicken / Aseel keepers across India (Telugu states first) |
| Feel | Warm, earthy, trustworthy, heritage |
| Primary | Amber `#b8701a` (dark `#7b3f00`) |
| Secondary | Cream `#fbf6ef` / paper `#ffffff` |
| Accent | Gold `#d6a24a`, Green `#2f6b3a` for "in stock / free delivery" |
| Text | Ink `#24160c` |
| Headings | Cormorant Garamond |
| Body | Inter (Noto Sans Telugu for Telugu names) |
| Rules | No red/white icons, no decorative icons. Mobile first, sticky "Add to Cart" bar on phones. |

## 3. Tech stack
| Part | Choice | Why |
|---|---|---|
| Pages | Next.js (App Router) + TypeScript, **static export** (`output: 'export'`, `basePath: '/shop'`) | Modern code, but still plain files — keeps free GitHub Pages hosting |
| Styling | Tailwind CSS with the brand colours above as theme tokens | Fast, consistent |
| Cart | Zustand store saved in the browser (localStorage) | Cart survives refresh, no login needed |
| Data | Supabase (project `tsjiazashtxoybyaknec`) read with the public anon key | Same products as the app |
| Orders | Existing server functions `web_place_shop_order`, `web_shop_order`, `web_submit_shop_payment` | Server always re-checks price, stock and delivery |
| Online payment | CCAvenue (approved 24 Nov 2026) via a new Supabase edge function, test mode first | Gateway secret key never sits in the browser |
| COD | Kept | Most buyers want it |
| Admin | Existing Command Center (`roosterclub-admin`) — Shop orders and products pages | Already built; no second admin |
| Hosting | GitHub Pages, repo `roosterclub.co.in` | Free, SSL included |

## 4. Folder structure
```
roosterclub.co.in/                 (repo root — existing site stays as it is)
├── ARCHITECTURE.md                (this file)
├── shop-src/                      (NEW — Next.js source, not served)
│   ├── next.config.mjs            output:'export', basePath:'/shop', trailingSlash:true
│   ├── tailwind.config.ts         brand colours + fonts
│   ├── app/
│   │   ├── layout.tsx             header, footer, cart drawer, fonts
│   │   ├── page.tsx               Shop home: hero, trust badges, featured grid, reviews
│   │   ├── c/[category]/page.tsx  Listing page: filters, sort
│   │   ├── p/[id]/page.tsx        Product page: gallery, variants, accordion, sticky Add to Cart
│   │   ├── checkout/page.tsx      Address form + order summary + COD / pay online
│   │   ├── order/page.tsx         Order tracking (?t=<web_token>)
│   │   └── my-orders/page.tsx     Orders placed from this phone
│   ├── components/                Header, Hero, TrustBadges, ProductCard, Gallery, VariantPicker,
│   │                              Accordion, StickyBuyBar, CartDrawer, FreeShipBar, ReviewStrip,
│   │                              AddressForm, OrderSummary, OrderTracker
│   ├── lib/
│   │   ├── supabase.ts            fetch helpers (anon key, read-only + RPC)
│   │   ├── products.ts            load + map products, "coming soon" list
│   │   ├── pricing.ts             FREE_DELIVERY 999, DELIVERY_FEE 49 (display only)
│   │   ├── pincode.ts             6-digit check + state lookup for address validation
│   │   └── analytics.ts           add-to-cart / checkout events
│   ├── store/cart.ts              Zustand cart (persist, max 20 per item)
│   └── scripts/build-products.ts  at build time: writes one page per live product (for Google)
└── shop/                          (BUILD OUTPUT — what GitHub Pages serves)
```
Build: `cd shop-src && npm run build` → copies `out/` into `shop/` → commit in GitHub Desktop.

## 5. Data (already in Supabase — no new tables for Phases 1–2)
- `shop_products`: id, category, name, name_te, unit, price, mrp, stock_count, status
  (active / out_of_stock / draft), images[], description, details (jsonb: benefits, use, FAQ,
  composition), apparel (jsonb: T-shirt types/sizes/colours), rating_avg, rating_count,
  delivery_included, removed_at.
- `shop_product_reviews`: product_id, rating, body, verified → social proof.
- `shop_orders` + `shop_order_items`: website orders have `source='web'` and a `web_token`
  used for the tracking link (no login).
- Variants (pack size / colour / size): stored in `details.variants` (jsonb) for non-apparel,
  `apparel.types` for T-shirts. Server re-prices every variant.

Planned change for Phase 3 only (online payment): edge function `ccav-shop` (make encrypted
payment request, handle CCAvenue reply, mark order paid) + columns `ccav_order_id`,
`ccav_tracking_id` on `shop_orders`. Needs Ranga's OK before it touches live payments.

## 6. Cart state
```ts
type CartLine = { id: string; variant?: string; qty: number }   // max 20
cart store: lines[], open (drawer), add(), setQty(), remove(), clear()
derived:    subtotal, deliveryFee (0 if subtotal >= 999 else 49), toFreeDelivery
saved in localStorage key 'rc-web-cart-v2' (old 'rc-web-cart-v1' is read once and moved over)
```

## 7. Build phases
1. Layout + Shop home
2. Listing page, product page, cart drawer
3. Checkout (COD + CCAvenue test mode), order tracking, admin check in Command Center

## 8. Log
- 27 Nov 2026 — Draft plan written. Waiting for approval.
- 27 Nov 2026 — CCAvenue online payment added to the CURRENT shop (assets/shop.js), ahead of the rebuild.
  DB: shop_orders.payment_method 'ccavenue' + ccav_* columns; RPCs web_shop_pay_options, ccav_begin,
  ccav_finish (service role only); web_place_shop_order takes p_contact.pay='online'.
  Edge fn `ccav-shop` (no JWT): start payment + receives CCAvenue reply (?r=<web_token>), redirects to
  /shop/#o/<token>/paid|failed. Switch: app_config.shop_pay.ccav_enabled (false until Ranga turns it on).
  Secrets needed: CCAV_MERCHANT_ID, CCAV_ACCESS_CODE, CCAV_WORKING_KEY (optional CCAV_ENV=test).
  Also fixed expire_unpaid_shop_orders crashing on website orders (no buyer). Command Center Orders
  page shows "PAID online · do NOT collect cash".
- 28 Nov 2026 — Shop 3.0 redesign done inside the CURRENT shop (assets/shop.js + shop.css v4, shop/index.html), not the Next.js rebuild. New home (T-shirt hero, category tiles, story, how-to-order, FAQ, app band), breadcrumbs, trust boxes, 'You may also like', phone sticky buy bar, WhatsApp help button. Orders, CCAvenue and the T-shirts-only rule are unchanged.
