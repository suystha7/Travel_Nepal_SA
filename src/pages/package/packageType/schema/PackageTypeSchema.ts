import * as Yup from 'yup';

// Common schema shape
const baseSchema = {
  name: Yup.string().required('Name is required'),
  image: Yup.mixed().required('Image is required'),
};

// Package Type
export const PackageTypeSchema = Yup.object().shape(baseSchema);
export type packageTypeFormField = Yup.InferType<typeof PackageTypeSchema>;

// Package Category
export const PackageCategorySchema = Yup.object().shape(baseSchema);
export type packageCategoryFormField = Yup.InferType<typeof PackageCategorySchema>;

// Optional: Map for easier dynamic access
export const PackageSchemas = {
  packageType: PackageTypeSchema,
  packageCategory: PackageCategorySchema,
};
