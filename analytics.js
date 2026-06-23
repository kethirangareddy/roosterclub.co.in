/* Rooster Club — website visitor analytics (Google Analytics 4)
 * STEP 1: create a free GA4 property at https://analytics.google.com
 * STEP 2: copy your Measurement ID (looks like G-G8W45QV4BF)
 * STEP 3: paste it below, replacing G-G8W45QV4BF. Save, commit & push.
 * Until a real ID is set, this file does nothing (no tracking).
 */
(function () {
  var GA_ID = "G-G8W45QV4BF"; // <-- REPLACE with your GA4 Measurement ID
  if (!GA_ID || GA_ID.indexOf("XXXX") !== -1) return; // not configured yet
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag("js", new Date());
  gtag("config", GA_ID);
})();
