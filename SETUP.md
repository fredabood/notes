# Quartz v4 Setup for Fred's Notes

This document explains how your Quartz-powered notes site has been configured and how to use it.

## What Was Set Up

Your repository now has a complete Quartz v4 installation that will automatically deploy your markdown notes as a beautiful, interconnected website at `notes.fredabood.com`.

### Project Structure

```
notes/
├── content/               # Your markdown notes go here
│   ├── index.md          # Homepage
│   ├── Chicago.md        # Your existing notes
│   ├── Data-Guide.md     # Your existing notes
│   └── ...               # Add more notes here
├── quartz/               # Quartz source code
│   ├── styles/
│   │   └── custom.scss   # Custom theme matching fredabood.com
│   └── static/
│       └── CNAME         # Custom domain configuration
├── .github/
│   └── workflows/
│       └── deploy.yml    # Automatic deployment workflow
├── quartz.config.ts      # Main configuration file
├── quartz.layout.ts      # Layout configuration
└── package.json          # Dependencies
```

## Design Decisions

### Theme Matching fredabood.com

The Quartz theme has been customized to match the minimal, professional aesthetic of your personal website:

**Color Scheme:**
- Pure white background (#ffffff)
- Clean, readable text in dark gray (#1f2937)
- Blue accent colors (#3b82f6, #6366f1) for links and highlights
- Subtle grays for borders and secondary text

**Typography:**
- **Font:** Inter - A modern, clean, professional sans-serif font
- **Code:** JetBrains Mono - Clean monospace font for code blocks
- **Line height:** 1.7 for excellent readability
- **Letter spacing:** Slightly tightened (-0.011em) for a modern feel

**Layout & Spacing:**
- **Maximum width:** 800px for optimal reading
- **Generous padding:** 2rem on articles for breathability
- **White space:** Ample margins and spacing throughout
- **Mobile responsive:** Adapts beautifully to all screen sizes

**Interaction Design:**
- **Smooth transitions:** 0.2s ease transitions matching fredabood.com
- **Clean hover states:** Subtle underlines and opacity changes
- **No clutter:** Minimal, focused design

**Key Features Enabled:**
- ✅ Backlinks - See which notes link to the current page
- ✅ Graph view - Visualize connections between notes
- ✅ Search - Fast full-text search
- ✅ Wikilinks - Use `[[Note Name]]` syntax
- ✅ Table of Contents - Auto-generated for each page
- ✅ Popovers - Hover over links to preview content
- ✅ SPA mode - Fast page transitions

### Configuration Details

**Site Settings (quartz.config.ts):**
- Page title: "Fred's Notes"
- Base URL: notes.fredabood.com
- Wikilinks: Shortest path resolution
- Analytics: Disabled (can enable later if needed)

## How to Use

### Publishing New Notes

1. **Create or edit markdown files** in the `content/` directory:
   ```bash
   # Add a new note
   echo "# My New Note" > content/my-new-note.md
   ```

2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Add new notes"
   git push origin main
   ```

3. **That's it!** GitHub Actions will automatically:
   - Install dependencies
   - Build your site with Quartz
   - Deploy to GitHub Pages
   - Your changes will be live at notes.fredabood.com in ~2 minutes

### Markdown Features

**Wikilinks:**
```markdown
Link to another note: [[Data-Guide]]
Link with custom text: [[Data-Guide|Check out this guide]]
```

**Frontmatter:**
```markdown
---
title: My Note Title
date: 2024-01-15
tags:
  - data
  - engineering
---

Your note content here...
```

**Tables, code blocks, images** - all standard markdown is supported!

### Local Development (Optional)

If you want to preview changes locally before pushing:

```bash
# Build and serve locally
npx quartz build --serve

# Visit http://localhost:8080
```

## GitHub Pages & Custom Domain Setup

### Step 1: Enable GitHub Pages

1. Go to https://github.com/fredabood/notes/settings/pages
2. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
   - (Do NOT select "Deploy from a branch")

### Step 2: Configure DNS

Add these DNS records in your domain registrar (wherever you manage fredabood.com):

**Option A: Using CNAME (Recommended)**
```
Type: CNAME
Name: notes
Value: fredabood.github.io
TTL: 3600 (or automatic)
```

**Option B: Using A Records**
```
Type: A
Name: notes
Value: 185.199.108.153

Type: A
Name: notes
Value: 185.199.109.153

Type: A
Name: notes
Value: 185.199.110.153

Type: A
Name: notes
Value: 185.199.111.153
```

### Step 3: Configure Custom Domain in GitHub

1. Go to https://github.com/fredabood/notes/settings/pages
2. Under "Custom domain":
   - Enter: `notes.fredabood.com`
   - Click "Save"
3. Wait a few minutes for DNS to propagate
4. Check "Enforce HTTPS" once available (may take 10-15 minutes)

### Step 4: Verify

1. Wait 5-10 minutes for DNS propagation
2. Visit https://notes.fredabood.com
3. You should see your notes site!

To verify DNS is working:
```bash
# Check CNAME resolution
dig notes.fredabood.com CNAME

# Check if DNS is pointing to GitHub
dig notes.fredabood.com
```

## Troubleshooting

### Build Fails

Check the GitHub Actions tab: https://github.com/fredabood/notes/actions

Common issues:
- **Syntax errors in markdown:** Fix the markdown file
- **Missing dependencies:** The workflow should handle this automatically

### Custom Domain Not Working

1. **DNS not propagated yet:** Wait 10-30 minutes
2. **Check DNS records:** Use `dig notes.fredabood.com` to verify
3. **Check GitHub Pages settings:** Ensure custom domain is set
4. **HTTPS not available yet:** Wait 15 minutes after DNS propagates

### Build Warnings About Git

The warnings about files "not yet tracked by git" are normal - they just mean date metadata will use file timestamps instead of git history. Commit your files to fix this.

## Customizing Further

### Modify Theme Colors

Edit `quartz/styles/custom.scss` to change colors, spacing, or any visual aspect.

After editing, commit and push - the site will rebuild automatically.

### Change Site Title or URL

Edit `quartz.config.ts`:
```typescript
pageTitle: "Your New Title",
baseUrl: "yournewdomain.com",
```

### Add Custom Components

Edit `quartz.layout.ts` to customize:
- Header components
- Sidebar components
- Footer components
- Page layout

See https://quartz.jzhao.xyz/layout for details.

### Disable Features

Edit the `plugins` section in `quartz.config.ts` to enable/disable:
- Graph view
- Backlinks
- Table of contents
- Search
- And more

## File Organization Tips

**Recommended structure:**
```
content/
├── index.md              # Homepage
├── daily/                # Daily notes
│   └── 2024-01-15.md
├── projects/             # Project notes
│   └── homelab.md
├── areas/                # Areas of knowledge
│   ├── data-engineering.md
│   └── cooking.md
└── resources/            # Reference material
    └── tools.md
```

Quartz will automatically create navigation for folders and maintain links between notes regardless of organization.

## Resources

- **Quartz Documentation:** https://quartz.jzhao.xyz/
- **Your Repository:** https://github.com/fredabood/notes
- **GitHub Actions:** https://github.com/fredabood/notes/actions
- **Your Live Site:** https://notes.fredabood.com

## Next Steps

1. ✅ Complete GitHub Pages setup (Step 1 above)
2. ✅ Configure DNS records (Step 2 above)
3. ✅ Add custom domain in GitHub (Step 3 above)
4. Start writing notes in `content/`!
5. Optional: Customize theme colors in `quartz/styles/custom.scss`
6. Optional: Add profile picture to `quartz/static/icon.png`

---

**Questions or issues?** Check the Quartz docs or the GitHub Actions logs for detailed error messages.
