import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Fred's Notes",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "notes.fredabood.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#CED1DB",           // Background - exact match from fredabood.com
          lightgray: "#B5BAC7",       // Slightly darker blue-gray for borders
          gray: "#7A8390",            // Medium gray for secondary text
          darkgray: "#025418",        // Main text - exact dark green from fredabood.com
          dark: "#013410",            // Headings - darker green
          secondary: "#027020",       // Links - medium green (complements the text)
          tertiary: "#048832",        // Accent - brighter green
          highlight: "rgba(2, 84, 24, 0.1)",   // Subtle green highlight
          textHighlight: "#E8F5E9",   // Light green for text selection
        },
        darkMode: {
          light: "#2C3540",           // Dark blue-gray background (darker version of #CED1DB)
          lightgray: "#3D4854",       // Slightly lighter blue-gray
          gray: "#7A8390",            // Medium gray (same as light mode)
          darkgray: "#A8E6B0",        // Light green for text (readable on dark)
          dark: "#C8F5D0",            // Very light green for headings
          secondary: "#66BB6A",       // Medium green for links
          tertiary: "#81C784",        // Lighter green accent
          highlight: "rgba(168, 230, 176, 0.15)",  // Subtle green highlight
          textHighlight: "#1B5E20",   // Dark green for selection
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
