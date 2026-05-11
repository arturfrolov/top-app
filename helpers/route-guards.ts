const FIRST_LEVEL_ROUTES = new Set(['books', 'courses', 'products', 'services']);

const BLOCKED_ALIASES = new Set([
	'_catalog',
	'admin',
	'api-docs',
	'config',
	'env',
	'index',
	'login',
	'php-cgi',
	'requests',
	'security',
	'sftp',
	'swagger',
	'swagger-ui',
]);

const VALID_ALIAS_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isFirstLevelRoute(route: string): boolean {
	return FIRST_LEVEL_ROUTES.has(route);
}

export function isLikelyPageAlias(alias: string): boolean {
	if (alias.length < 2 || alias.length > 80) {
		return false;
	}

	if (!VALID_ALIAS_PATTERN.test(alias)) {
		return false;
	}

	return !BLOCKED_ALIASES.has(alias);
}
