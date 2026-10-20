#!/usr/bin/env python3
"""Generate the public profile pages for roosterclub.co.in.

GitHub Pages has no rewrites, so /u/<handle> only returns HTTP 200 (and a WhatsApp
preview) if a real file exists at u/<handle>/index.html. This script writes:
  - 404.html                     (router for /v/, /c/ and any handle not generated yet)
  - u/<handle>/index.html        (tiny stub per seller, with that seller's preview tags)
  - u/index.html

Input: tools/handles.txt — comma- or newline-separated handles. Optionally
tools/profiles.json — [{"handle":..,"name":..,"district":..,"state":..,"image":..}]
for per-seller titles/images; any handle without an entry gets a generic card.

Run from the repo root:  python3 tools/gen_profiles.py
Pull a fresh list (Supabase SQL editor), paste into tools/handles.txt:
  select string_agg(handle, ',' order by handle) from users
  where coalesce(banned,false)=false and handle ~ '^[A-Za-z0-9_.-]+$';
"""
import html, json, os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOOLS = os.path.join(ROOT, 'tools')
VER = '20261021'
SITE = 'https://roosterclub.co.in'
LOGO = SITE + '/app-logo.png'
OK = re.compile(r'^[A-Za-z0-9_.-]+$')

def a(s):  # attribute-safe
    return html.escape(str(s or ''), quote=True)

def meta(title, desc, url, image, kind='website', large=False):
    return '\n'.join([
        '<meta name="description" content="%s" />' % a(desc),
        '<meta property="og:site_name" content="Rooster Club" />',
        '<meta property="og:type" content="%s" />' % kind,
        '<meta property="og:title" content="%s" />' % a(title),
        '<meta property="og:description" content="%s" />' % a(desc),
        '<meta property="og:image" content="%s" />' % a(image),
        '<meta property="og:url" content="%s" />' % a(url),
        '<meta name="twitter:card" content="%s" />' % ('summary_large_image' if large else 'summary'),
    ])

def main():
    tpl = open(os.path.join(TOOLS, 'profile_template.html'), encoding='utf-8').read()
    raw = open(os.path.join(TOOLS, 'handles.txt'), encoding='utf-8').read()
    handles = sorted({h.strip() for h in re.split(r'[,\s]+', raw) if h.strip()})
    bad = [h for h in handles if not OK.match(h) or h in ('.', '..')]
    handles = [h for h in handles if h not in bad]

    info = {}
    pj = os.path.join(TOOLS, 'profiles.json')
    if os.path.exists(pj):
        for p in json.load(open(pj, encoding='utf-8')):
            if p.get('handle'):
                info[p['handle']] = p

    def page(title, m):
        return tpl.replace('{{TITLE}}', a(title)).replace('{{META}}', m).replace('{{VER}}', VER)

    # 404 router
    open(os.path.join(ROOT, '404.html'), 'w', encoding='utf-8').write(page('Rooster Club', meta(
        'Rooster Club', "India's marketplace for poultry and gamefowl.", SITE, LOGO)))

    udir = os.path.join(ROOT, 'u')
    keep = set(handles)
    if os.path.isdir(udir):  # drop pages for banned / renamed handles
        for d in os.listdir(udir):
            p = os.path.join(udir, d)
            if os.path.isdir(p) and d not in keep:
                shutil.rmtree(p)
    os.makedirs(udir, exist_ok=True)
    open(os.path.join(udir, 'index.html'), 'w', encoding='utf-8').write(page('Rooster Club breeders', meta(
        'Rooster Club breeders', "India's marketplace for poultry and gamefowl.", SITE + '/u/', LOGO)))

    for h in handles:
        p = info.get(h, {})
        name = p.get('name') or ('@' + h)
        loc = ', '.join(x for x in (p.get('district'), p.get('state')) if x)
        title = '%s on Rooster Club' % name
        desc = (loc + ' · ' if loc else '') + 'See this breeder’s birds, verified sales and farm story. Chat and buy on Rooster Club.'
        img = p.get('image') if str(p.get('image') or '').startswith('https://') else LOGO
        d = os.path.join(udir, h)
        os.makedirs(d, exist_ok=True)
        open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(
            page(title, meta(title, desc, '%s/u/%s' % (SITE, h), img, 'profile', img != LOGO)))

    print('generated %d profile pages (%d skipped as unsafe: %s)' % (len(handles), len(bad), ','.join(bad)))

if __name__ == '__main__':
    sys.exit(main())
