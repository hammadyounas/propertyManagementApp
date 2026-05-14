/**
 * Application routes for the Next.js `pages/` router.
 * Prefer these values and helpers over hardcoded path strings in navigation.
 *
 * @readonly
 * @enum {string}
 */
export const AppRoutes = Object.freeze({
  HOME: "/",
  FORGOT_PASSWORD: "/forgot-password",

  DASHBOARD: "/dashboard",
  DASHBOARD_ADD: "/dashboard/add",

  CLIENTS: "/clients",
  CLIENTS_CREATE: "/clients/create",

  BROKER: "/broker",
  BROKER_CREATE: "/broker/create",

  PROPERTIES: "/properties",
  PROPERTIES_CREATE: "/properties/create",

  ACMS: "/acms",
  ACMS_CREATE: "/acms/create",

  TEMPLATES: "/templates",
  TEMPLATES_CREATE: "/templates/create",
  TEMPLATES_DELETED: "/templates/deleted",

  DOCUMENTS: "/documents",
  DOCUMENTS_CREATE: "/documents/create",
  DOCUMENTS_DELETED: "/documents/deleted",

  INVOICES: "/invoices",
  INVOICES_CREATE: "/invoices/create",

  EMAIL_TEMPLATES: "/email-templates",
  EMAIL_TEMPLATES_CREATE: "/email-templates/create",

  MARKETING_EMAILS: "/marketing-emails",
  MARKETING_EMAILS_SEND: "/marketing-emails/send",

  /** Public static file used for client CSV import sample. */
  SAMPLE_CLIENT_DATA_CSV: "/sample-client-data.csv",
});

/** @param {string} id */
export function dashboardEditPath(id) {
  return `${AppRoutes.DASHBOARD}/edit/${id}`;
}

/** @param {string} id */
export function clientViewPath(id) {
  return `${AppRoutes.CLIENTS}/view/${id}`;
}

/** @param {string} id */
export function clientEditPath(id) {
  return `${AppRoutes.CLIENTS}/edit/${id}`;
}

/** @param {string} id */
export function brokerViewPath(id) {
  return `${AppRoutes.BROKER}/view/${id}`;
}

/** @param {string} id */
export function brokerEditPath(id) {
  return `${AppRoutes.BROKER}/edit/${id}`;
}

/** @param {string} id */
export function propertyViewPath(id) {
  return `${AppRoutes.PROPERTIES}/view/${id}`;
}

/** @param {string} id */
export function propertyEditPath(id) {
  return `${AppRoutes.PROPERTIES}/edit/${id}`;
}

/** @param {string} id */
export function acmEditPath(id) {
  return `${AppRoutes.ACMS}/edit/${id}`;
}

/** @param {string} id */
export function templateEditPath(id) {
  return `${AppRoutes.TEMPLATES}/edit/${id}`;
}

/** @param {string} documentId */
export function documentEditPath(documentId) {
  return `${AppRoutes.DOCUMENTS}/edit/${documentId}`;
}

/** @param {string | number} templateId */
export function documentCreateWithTemplateQuery(templateId) {
  return `${AppRoutes.DOCUMENTS_CREATE}?template=${encodeURIComponent(String(templateId))}`;
}
