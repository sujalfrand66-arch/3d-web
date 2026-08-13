import subprocess
import os
import urllib.request
import re
import json

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "assets", "projects"))

os.makedirs(OUTPUT_DIR, exist_ok=True)

SITES = [
    {
        "id": "01",
        "title": "SURATGARH PROPERTIES",
        "slug": "suratgarh-properties",
        "url": "https://suratgarhproperties.shop/",
        "category": "REAL ESTATE PORTAL",
    },
    {
        "id": "02",
        "title": "GLAMOUR MAKEOVER",
        "slug": "glamour-makeover",
        "url": "https://glamourmakeover.in/",
        "category": "BEAUTY & LIFESTYLE",
    },
    {
        "id": "03",
        "title": "MEGHNA MOTORS",
        "slug": "meghna-motors",
        "url": "https://meghnamotors.online/",
        "category": "AUTOMOTIVE DEALERSHIP",
    },
    {
        "id": "04",
        "title": "PARMARTH MEDICOSE",
        "slug": "parmarth-medicose",
        "url": "https://parmarthmedicose.store/",
        "category": "PHARMACY & HEALTHCARE",
    },
    {
        "id": "05",
        "title": "RAJWADA FURNISH",
        "slug": "rajwada-furnish",
        "url": "https://www.rajwadafurnish.com/",
        "category": "LUXURY FURNITURE & DECOR",
    },
    {
        "id": "06",
        "title": "CHAWLA SILK STORE",
        "slug": "chawla-silk-store",
        "url": "https://chawlasilkstore.com/",
        "category": "ETHNIC WEAR & SILKS",
    },
    {
        "id": "07",
        "title": "GROSHINE CONSULTANTS",
        "slug": "groshine-consultants",
        "url": "https://groshineconsultants.com/",
        "category": "BUSINESS & CONSULTING",
    },
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for site in SITES:
    out_file = os.path.join(OUTPUT_DIR, f"{site['slug']}.png")
    print(f"Processing {site['title']} -> {site['url']}")
    
    # Try Edge screenshot first
    temp_dir = os.path.join(os.path.dirname(__file__), f"temp_{site['slug']}")
    os.makedirs(temp_dir, exist_ok=True)
    
    cmd = [
        EDGE_PATH,
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        f"--user-data-dir={temp_dir}",
        f"--screenshot={out_file}",
        "--window-size=1600,900",
        site['url']
    ]
    
    try:
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=25)
        if os.path.exists(out_file) and os.path.getsize(out_file) > 5000:
            print(f"  [SUCCESS] Edge screenshot captured: {os.path.getsize(out_file)} bytes")
            continue
        else:
            print(f"  [EDGE screenshot missing/small, checking file...]")
    except Exception as e:
        print(f"  [EDGE Error]: {e}")

    # Fallback: fetch og:image or main image
    try:
        req = urllib.request.Request(site['url'], headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8', errors='ignore')
            
            # Look for og:image
            og_match = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
            if not og_match:
                og_match = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', html, re.IGNORECASE)
                
            if og_match:
                img_url = og_match.group(1)
                if not img_url.startswith('http'):
                    img_url = urllib.parse.urljoin(site['url'], img_url)
                print(f"  Found og:image: {img_url}")
                img_req = urllib.request.Request(img_url, headers=headers)
                with urllib.request.urlopen(img_req, timeout=10) as img_res:
                    with open(out_file, 'wb') as f:
                        f.write(img_res.read())
                print(f"  [SUCCESS] Downloaded og:image ({os.path.getsize(out_file)} bytes)")
                continue
    except Exception as e:
        print(f"  [Fallback Error]: {e}")

print("Done processing sites.")
