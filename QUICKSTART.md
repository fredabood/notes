# Quick Start Guide

## Immediate Next Steps

### 1. Commit and Push to GitHub

```bash
git add .
git commit -m "Set up Quartz v4 with custom theme matching fredabood.com

- Configured Quartz v4 static site generator
- Custom theme matching fredabood.com aesthetic
- GitHub Actions workflow for auto-deployment
- Custom domain setup for notes.fredabood.com"

git push origin main
```

### 2. Enable GitHub Pages

1. Visit: https://github.com/fredabood/notes/settings/pages
2. Under "Build and deployment":
   - **Source:** Select "GitHub Actions" (not "Deploy from a branch")
3. Save

### 3. Configure DNS

In your domain registrar (where you manage fredabood.com DNS):

**Add this CNAME record:**
```
Type: CNAME
Name: notes
Value: fredabood.github.io
```

### 4. Set Custom Domain in GitHub

1. Go to: https://github.com/fredabood/notes/settings/pages
2. Under "Custom domain", enter: `notes.fredabood.com`
3. Click "Save"
4. Wait 10-15 minutes, then check "Enforce HTTPS"

### 5. Verify It's Working

After 10-15 minutes:
- Visit https://notes.fredabood.com
- You should see your notes site!

## Daily Workflow

```bash
# Edit or create notes in content/
vim content/my-new-note.md

# Commit and push
git add .
git commit -m "Add new notes"
git push

# Site automatically rebuilds and deploys!
```

## What Was Customized

**Theme matches fredabood.com:**
- ✅ Clean white background
- ✅ Professional Inter font
- ✅ Blue accent colors (#3b82f6)
- ✅ Generous spacing and white space
- ✅ Smooth transitions
- ✅ Minimal, uncluttered design

**Features enabled:**
- ✅ Wikilinks: `[[Note Name]]`
- ✅ Backlinks
- ✅ Graph view
- ✅ Search
- ✅ Table of contents
- ✅ Automatic deployment

## Files to Customize

- `content/` - Your notes go here
- `quartz/styles/custom.scss` - Theme customization
- `quartz.config.ts` - Site configuration
- `content/index.md` - Homepage

## Resources

- **Full Setup Guide:** See `SETUP.md`
- **Quartz Docs:** https://quartz.jzhao.xyz/
- **Your Site (after setup):** https://notes.fredabood.com
- **GitHub Actions:** https://github.com/fredabood/notes/actions

## Troubleshooting

**Site not deploying?**
- Check GitHub Actions: https://github.com/fredabood/notes/actions
- Look for errors in the workflow logs

**Custom domain not working?**
- Wait 10-30 minutes for DNS propagation
- Verify DNS: `dig notes.fredabood.com`
- Check GitHub Pages settings

**Need help?**
- See detailed instructions in `SETUP.md`
- Check Quartz documentation
