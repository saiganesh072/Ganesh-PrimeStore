import os
import glob

html_files = glob.glob('*.html')

replacements = [
    ('href="vendor/', 'href="public/vendor/'),
    ('src="vendor/', 'src="public/vendor/'),
    ('href="fonts/', 'href="public/fonts/'),
    ('href="css/', 'href="public/css/'),
    ('src="js/', 'src="public/js/'),
    ('href="images/', 'href="public/images/'),
    ('src="images/', 'src="public/images/'),
    ('url(images/', 'url(public/images/'),
    ("url('images/", "url('public/images/"),
    ('data-thumb="images/', 'data-thumb="public/images/')
]

count = 0
for file_path in html_files:
    if file_path == 'index.html':
         # Skip index.html since it was already done manually, 
         # but actually running it again won't hurt because "href="vendor/" 
         # won't match "href="public/vendor/" so it's idempotent.
         # But just to be cleaner, we can comment out skipping if we want to be sure.
         # However, we must ensure we don't double replace.
         # My replacements search for 'href="vendor/' which is NOT present if it is 'href="public/vendor/'
         pass 

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements:
        # Check if already replaced to be extra safe, although string replacement wouldn't match "public/..." against "vendor/"
        # But 'href="public/vendor/' DOES NOT contain 'href="vendor/'? 
        # Wait: 'href="public/vendor/' contains "vendor/" but NOT "href=\"vendor/". True.
        # So it is safe.
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
        count += 1
    else:
        print(f"No changes in {file_path}")

print(f"Total files updated: {count}")
