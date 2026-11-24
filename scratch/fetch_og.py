import urllib.request
import re
import os

OUTPUT_DIR = r"C:\Users\hh\coding\DR MISHRA\phase 2\public\assets\projects"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

sites = [
    ('https://www.rajwadafurnish.com/', 'rajwada-furnish'),
    ('https://chawlasilkstore.com/', 'chawla-silk-store')
]

for url, slug in sites:
    out_file = os.path.join(OUTPUT_DIR, f"{slug}.png")
    if os.path.exists(out_file) and os.path.getsize(out_file) > 5000:
        print(f"Already exists: {slug}")
        continue
    print(f"Fetching OG/asset for {slug} from {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as res:
            html = res.read().decode('utf-8', errors='ignore')
            
            # Find og:image or hero image or logo/banner
            og = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
            if not og:
                og = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', html, re.IGNORECASE)
            
            img_url = None
            if og:
                img_url = og.group(1)
            else:
                # Find first large img tag or hero img
                img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.IGNORECASE)
                if img_match:
                    img_url = img_match.group(1)
            
            if img_url:
                if not img_url.startswith('http'):
                    img_url = urllib.parse.urljoin(url, img_url)
                print(f"  Downloading image: {img_url}")
                img_req = urllib.request.Request(img_url, headers=headers)
                with urllib.request.urlopen(img_req, timeout=15) as img_res:
                    with open(out_file, 'wb') as f:
                        f.write(img_res.read())
                print(f"  Saved {slug}.png ({os.path.getsize(out_file)} bytes)")
    except Exception as e:
        print(f"  Error fetching {slug}: {e}")
