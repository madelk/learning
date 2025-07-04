import { getCurrentApp } from "@study/helpers";

import type { NavBarConfig, FrameworkIcons } from "../types/index.js";

/** Port mappings for development environment */
const APP_PORTS = {
	react: 4200,
	vue: 4203,
	webcomponents: 4202
} as const;

/** Domain configuration for local and production environments */
const DOMAINS = {
	local: "http://localhost",
	production: "https://www.madelk.co.uk"
} as const;

/** URL paths for each application */
const APP_PATHS = {
	react: "/react",
	vue: "/vue",
	webcomponents: "/webcomponents"
} as const;

const FAVICON_FILE_NAME = "/favicon.png";

/** Determines if the application is running in a localhost environment */
export function isLocalhost(): boolean {
	if (globalThis.window === undefined) {
		return false;
	}
	const { hostname } = globalThis.location;
	return hostname === "localhost" || hostname === "127.0.0.1";
}

/**
 * Retrieves framework-specific icon URLs for both local and production environments
 * @returns An object containing icon URLs for each supported framework
 */
export function getIcons(): FrameworkIcons {
	if (globalThis.window === undefined) {
		return {} as FrameworkIcons;
	}
	const isLocal = isLocalhost();

	if (isLocal) {
		return {
			react: `${DOMAINS.local}:${APP_PORTS.react}${APP_PATHS.react}${FAVICON_FILE_NAME}`,
			vue: `${DOMAINS.local}:${APP_PORTS.vue}${APP_PATHS.vue}${FAVICON_FILE_NAME}`,
			webcomponents: `${DOMAINS.local}:${APP_PORTS.webcomponents}${APP_PATHS.webcomponents}${FAVICON_FILE_NAME}`
		};
	}
	return {
		react: `${DOMAINS.production}${APP_PATHS.react}${FAVICON_FILE_NAME}`,
		vue: `${DOMAINS.production}${APP_PATHS.vue}${FAVICON_FILE_NAME}`,
		webcomponents: `${DOMAINS.production}${APP_PATHS.webcomponents}${FAVICON_FILE_NAME}`
	};
}

/**
 * Generates HTML img tags for framework icons with proper dimensions and alt text
 * @returns An object containing HTML strings for each framework's icon
 */
function getFrameworkIcons(): FrameworkIcons {
	const icons = getIcons();
	return {
		react: `<img src="${
			icons.react || ""
		}" alt="React" width="20" height="20" />`,
		vue: `<img src="${icons.vue || ""}" alt="Vue" width="20" height="20" />`,
		webcomponents: `<img src="${
			icons.webcomponents || ""
		}" alt="Web Components" width="20" height="20" />`
	};
}

const FRAMEWORK_ICONS = getFrameworkIcons();

/** Helper to get the current subpath after the app segment */
function getCurrentSubPath(): string {
	if (globalThis.window === undefined) {
		return "/";
	}
	const path = globalThis.location.pathname;
	// Match /appname/anything or /appname
	const match = path.match(/^\/(react|vue|webcomponents)(\/.*)?$/);
	return match && match[2] ? match[2] : "/";
}

/**
 * Default shared configuration for the navigation bar
 * @type {NavBarConfig}
 */
export const DEFAULT_NAVBAR_CONFIG: NavBarConfig = {
	items: [], // Items are managed by custom-config.ts
	appSelector: {
		enabled: true,
		currentApp: getCurrentApp(),
		apps: [
			{
				id: "react",
				name: "React",
				icon: FRAMEWORK_ICONS.react,
				localUrl: `${DOMAINS.local}:${APP_PORTS.react}${
					APP_PATHS.react
				}${getCurrentSubPath()}`,
				prodUrl: `${DOMAINS.production}${APP_PATHS.react}${getCurrentSubPath()}`
			},
			{
				id: "vue",
				name: "Vue",
				icon: FRAMEWORK_ICONS.vue,
				localUrl: `${DOMAINS.local}:${APP_PORTS.vue}${
					APP_PATHS.vue
				}${getCurrentSubPath()}`,
				prodUrl: `${DOMAINS.production}${APP_PATHS.vue}${getCurrentSubPath()}`
			},
			{
				id: "webcomponents",
				name: "Web Components",
				icon: FRAMEWORK_ICONS.webcomponents,
				localUrl: `${DOMAINS.local}:${APP_PORTS.webcomponents}${
					APP_PATHS.webcomponents
				}${getCurrentSubPath()}`,
				prodUrl: `${DOMAINS.production}${
					APP_PATHS.webcomponents
				}${getCurrentSubPath()}`
			}
		]
	},
	styles: {
		container: {
			backgroundColor: "#333",
			padding: "1rem",
			gap: "1rem",
			display: "flex",
			flexDirection: "row"
		},
		link: {
			color: "white",
			padding: "0.5rem",
			backgroundColor: "transparent",
			border: "none",
			fontSize: "16px",
			cursor: "pointer",
			textDecoration: "none"
		},
		dropdown: {
			backgroundColor: "#444",
			border: "1px solid #555",
			borderRadius: "4px",
			boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
			color: "white",
			padding: "0.5rem",
			fontSize: "16px",
			cursor: "pointer",
			minWidth: "150px"
		},
		dropdownItem: {
			padding: "0.5rem",
			cursor: "pointer",
			backgroundColor: "transparent",
			color: "white",
			hoverBackgroundColor: "#555",
			display: "flex",
			alignItems: "center",
			gap: "0.5rem"
		}
	}
};
