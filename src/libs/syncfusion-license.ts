import { registerLicense } from "@syncfusion/ej2-base";

export function applySyncfusionLicense() {
  // Direct process.env access so Next.js inlines NEXT_PUBLIC_ at build time.
  const raw = process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY;
  if (!raw) {
    return;
  }
  const license = String(raw)
    .replace(/^['"]|['"]$/g, "")
    .trim();
  if (license) {
    registerLicense(license);
  }
}
