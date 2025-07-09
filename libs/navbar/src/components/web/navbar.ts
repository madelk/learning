import { getNavbarConfig } from "../../config/custom-config.js";
import type { NavBarConfig } from "../../types/index.js";
import { generateAppSelectorHTML, generateCSS } from "../../utils/index.js";
// --- REWRITTEN NAVBAR WEB COMPONENT ---
export class NavBar extends HTMLElement {
  private config: NavBarConfig;
  private maxVisible = 5;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.config = getNavbarConfig();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  private generateNavItem(item: { label: string; href?: string }): string {
    return `<li class="navbar-item"><a href="${item.href ?? "#"}">${
      item.label
    }</a></li>`;
  }

  private generateOverflowMenu(
    items: { label: string; href?: string }[]
  ): string {
    return items
      .map((item) => `<li><a href="${item.href ?? "#"}">${item.label}</a></li>`)
      .join("");
  }

  private generateNavWithOverflow(
    items: { label: string; href?: string }[]
  ): string {
    if (items.length <= this.maxVisible) {
      return `<ul class="navbar-list">${items
        .map((item) => this.generateNavItem(item))
        .join("")}</ul>`;
    }
    const visible = items.slice(0, this.maxVisible - 1);
    const overflow = items.slice(this.maxVisible - 1);
    // Hamburger SVG icon
    const hamburgerIcon = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <rect y="4" width="24" height="2" rx="1" fill="currentColor"/>
        <rect y="11" width="24" height="2" rx="1" fill="currentColor"/>
        <rect y="18" width="24" height="2" rx="1" fill="currentColor"/>
      </svg>
    `;
    return `<ul class="navbar-list">${visible
      .map((item) => this.generateNavItem(item))
      .join("")}
      <li class="navbar-overflow">
        <button class="overflow-btn" aria-haspopup="true" aria-expanded="false" title="More navigation">${hamburgerIcon}</button>
        <ul class="overflow-menu">${this.generateOverflowMenu(overflow)}</ul>
      </li>
    </ul>`;
  }

  private render() {
    if (!this.shadowRoot) {
      return;
    }
    const appSelectorHTML = this.config.appSelector?.enabled
      ? generateAppSelectorHTML(this.config.appSelector)
      : "";
    this.shadowRoot.innerHTML = `
      <style>
        ${generateCSS(this.config.styles)}
        .navbar-list {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.5rem;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .navbar-item a {
          text-decoration: none;
          color: #fff;
          padding: 0.5em 1em;
          border-radius: 4px;
          transition: background 0.2s;
          background: transparent;
          display: block;
        }
        .navbar-item a:hover {
          background: #222;
          color: #fff;
        }
        .navbar-overflow {
          position: relative;
        }
        .overflow-btn {
          background: #222;
          color: #fff;
          border: 2px solid #fff;
          cursor: pointer;
          padding: 0.5em 1em;
          font: inherit;
          border-radius: 6px;
          min-width: 44px;
          min-height: 44px;
          text-align: center;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s, border 0.2s;
        }
        .overflow-btn:hover, .overflow-btn[aria-expanded="true"] {
          background: #444;
          color: #fff;
          border-color: #bbb;
        }
        .overflow-menu {
          display: none;
          position: absolute;
          top: 100%;
          right: 0;
          min-width: 160px;
          background: #222;
          color: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          border-radius: 4px;
          z-index: 10;
          margin: 0;
          padding: 0.5em 0;
          list-style: none;
        }
        .overflow-menu li {
          padding: 0;
        }
        .overflow-menu a {
          color: #fff;
          background: none;
          padding: 0.5em 1em;
          display: block;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .overflow-menu a:hover {
          background: #444;
          color: #fff;
        }
        .navbar-overflow.open .overflow-menu {
          display: block;
        }
      </style>
      <nav>
        ${appSelectorHTML}
        ${this.generateNavWithOverflow(this.config.items)}
      </nav>
    `;
  }

  private setupEventListeners() {
    if (!this.shadowRoot) {
      return;
    }

    // App selector toggle
    const toggleButton = this.shadowRoot.querySelector("#app-selector-toggle");
    const dropdown = this.shadowRoot.querySelector("#app-selector-dropdown");
    const arrow = this.shadowRoot.querySelector(".dropdown-arrow");

    if (toggleButton && dropdown) {
      toggleButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = dropdown.classList.contains("open");
        dropdown.classList.toggle("open", !isOpen);
        arrow?.classList.toggle("open", !isOpen);
      });
      document.addEventListener("click", () => {
        dropdown.classList.remove("open");
        arrow?.classList.remove("open");
      });
      const appItems =
        this.shadowRoot.querySelectorAll<HTMLElement>(".app-selector-item");
      Array.prototype.forEach.call(appItems, (item: HTMLElement) => {
        item.addEventListener("click", (event: Event) => {
          event.stopPropagation();
          const url = item.dataset["url"];
          if (url) {
            globalThis.location.href = url;
          }
        });
      });
    }

    // Overflow menu toggle
    const overflowButton =
      this.shadowRoot.querySelector<HTMLElement>(".overflow-btn");
    const overflowLi =
      this.shadowRoot.querySelector<HTMLElement>(".navbar-overflow");
    if (overflowButton && overflowLi) {
      overflowButton.addEventListener("click", (event_) => {
        event_.stopPropagation();
        const isOpen = overflowLi.classList.contains("open");
        overflowLi.classList.toggle("open", !isOpen);
        overflowButton.setAttribute("aria-expanded", (!isOpen).toString());
      });
      document.addEventListener("click", () => {
        overflowLi.classList.remove("open");
        overflowButton.setAttribute("aria-expanded", "false");
      });
    }
  }
}

customElements.define("custom-navbar", NavBar);
