import { getNavbarConfig } from "../../config/custom-config.js";
import type { NavBarConfig } from "../../types/index.js";
import {
	generateCSS,
	generateNavHTML,
	generateAppSelectorHTML
} from "../../utils/index.js";

export class NavBar extends HTMLElement {
	private config: NavBarConfig;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.config = getNavbarConfig();
	}

	connectedCallback() {
		this.render();
		this.setupEventListeners();
	}

	private render() {
		if (this.shadowRoot) {
			const appSelectorHTML = this.config.appSelector?.enabled
				? generateAppSelectorHTML(this.config.appSelector)
				: "";

			this.shadowRoot.innerHTML = `
        <style>
          ${generateCSS(this.config.styles)}
        </style>
        <nav>
          ${appSelectorHTML}
          ${generateNavHTML(this.config.items)}
        </nav>
      `;
		}
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

			// Close dropdown when clicking outside
			document.addEventListener("click", () => {
				dropdown.classList.remove("open");
				arrow?.classList.remove("open");
			});

			// App selector items
			const appItems = this.shadowRoot.querySelectorAll<HTMLElement>(".app-selector-item");
			// eslint-disable-next-line unicorn/no-array-for-each
			appItems.forEach((item) => {
				item.addEventListener("click", (event: Event) => {
					event.stopPropagation();
					const url = item.dataset["url"];
					if (url) {
						globalThis.location.href = url;
					}
				});
			});
		}
	}
}

customElements.define("custom-navbar", NavBar);
