import type { PackageValidationSchemaType } from '../schema/PackageSchema';

const DRAFT_KEY = 'create-package-draft';

interface PackageDraft {
  step: number;
  values: PackageValidationSchemaType;
}

export const savePackageDraft = (draft: PackageDraft) => {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
};

export const  loadPackageDraft = (): PackageDraft | null => {
  const raw = localStorage.getItem(DRAFT_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearPackageDraft = () => {
  localStorage.removeItem(DRAFT_KEY);
};
