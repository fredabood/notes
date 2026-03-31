import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  branding: string
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const NavBar: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const branding = opts?.branding ?? "Home"
    const links = opts?.links ?? {}
    return (
      <nav class={`navbar ${displayClass ?? ""}`}>
        <a href="https://fredabood.com" class="navbar-brand">
          {branding}
        </a>
        <div class="navbar-links">
          {Object.entries(links).map(([text, link]) => (
            <a href={link} class="navbar-link">
              {text}
            </a>
          ))}
        </div>
      </nav>
    )
  }

  NavBar.css = `
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
      border-bottom: 1px solid var(--lightgray);
      margin-bottom: 1rem;
      width: 100%;
    }
    .navbar-brand {
      font-weight: 600;
      font-size: 1.1rem;
      color: var(--dark);
      text-decoration: none;
    }
    .navbar-brand:hover {
      opacity: 0.8;
    }
    .navbar-links {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .navbar-link {
      font-size: 0.9rem;
      color: var(--gray);
      text-decoration: none;
    }
    .navbar-link:hover {
      color: var(--secondary);
      opacity: 1;
    }
  `

  return NavBar
}) satisfies QuartzComponentConstructor
