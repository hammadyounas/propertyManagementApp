/** @type {import("../types/formUI").LabelValueOption[]} */
export const licenceTypeRadioOptions = [
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Director", value: "director" },
];

/** Matches existing create-broker labels ("In Active"). */
/** @type {{ value: string; label: string }[]} */
export const salespersonStatus = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "In Active" },
];
