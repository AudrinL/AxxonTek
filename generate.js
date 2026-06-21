const fs = require('fs');

const pages = [
  { file: 'sourcing.html', title: 'Sourcing' },
  { file: 'interviews.html', title: 'Interviews' },
  { file: 'analytics.html', title: 'Analytics' },
  { file: 'security.html', title: 'Security' },
  { file: 'infrastructure.html', title: 'Infrastructure' },
  { file: 'cloud.html', title: 'Cloud Services' },
  { file: 'blog.html', title: 'Blog' },
  { file: 'careers.html', title: 'Careers' },
  { file: 'about.html', title: 'About Us' },
  { file: 'privacy.html', title: 'Privacy Policy' },
  { file: 'terms.html', title: 'Terms of Service' },
  { file: 'contact.html', title: 'Contact Us' }
];

let indexContent = fs.readFileSync('index.html', 'utf8');

const headPart = indexContent.split('<body>')[0];
const navMatch = indexContent.match(/<nav id="main-nav" class="vertical-nav">[\s\S]*?<\/nav>/);
const navPart = navMatch ? navMatch[0] : '';

const footerMatch = indexContent.match(/<footer>[\s\S]*?<\/footer>/);
const footerPart = footerMatch ? footerMatch[0] : '';

pages.forEach(p => {
    // Replace the title correctly
    let modifiedHead = headPart.replace(/<title>.*?<\/title>/, `<title>${p.title} | AxxonTek</title>`);
    
    const html = `${modifiedHead}<body>
    <div class="glow-border-wrapper">
        <div class="glow-border"></div>
    </div>

    ${navPart}

    <main>
        <section class="hero" style="min-height: 80vh; display: flex; align-items: center; justify-content: center; text-align: center;">
            <div class="hero-bg"></div>
            <div class="hero-overlay"></div>
            <div class="container hero-content" style="margin: 0 auto;">
                <h1 style="font-size: 4rem; margin-bottom: 20px;">${p.title}</h1>
                <p style="font-size: 1.25rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 40px;">This page is currently under development. Check back soon for updates.</p>
                <a href="index.html" class="btn btn-primary">Return Home</a>
            </div>
        </section>
    </main>

    ${footerPart}

    <script src="script.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(p.file, html);
    console.log('Created ' + p.file);
});
