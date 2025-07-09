import { getNavbarConfig } from "../../config/custom-config.js";
import type { NavBarConfig } from "../../types/index.js";
import { generateAppSelectorHTML, generateCSS } from "../../utils/index.js";
// @ts-expect-error Vite inline CSS import is not typed, but works at runtime
import navbarStyles from "./navbar.css?inline";
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
        ${navbarStyles}
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
