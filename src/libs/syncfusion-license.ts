import { registerLicense } from "@syncfusion/ej2-base";

function collectKeys(): string[] {
  const rawValues = [
    process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY,
    process.env.NEXT_PUBLIC_SYNCFUSION_UI_LICENSE_KEY,
    process.env.NEXT_PUBLIC_SYNCFUSION_DOCX_LICENSE_KEY,
  ];

  const keys = rawValues
    .filter((value): value is string => Boolean(value))
    .flatMap((value) =>
      String(value)
        .replace(/^['"]|['"]$/g, "")
        .split(/[;,]/)
        .map((part) => part.trim())
        .filter(Boolean)
    );

  return [...new Set(keys)];
}

export function applySyncfusionLicense() {
  const keys = collectKeys();
  if (keys.length) {
    registerLicense(keys.join(";"));
  }
}
