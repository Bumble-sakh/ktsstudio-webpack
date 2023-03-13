export type CategoryApi = {
  id: number;
  name: string;
  image: string;
};

export type CategoryModel = {
  id: number;
  name: string;
  image: string;
};

export const normalizeCategory = (from: CategoryApi): CategoryModel => ({
  id: from.id,
  name: from.name,
  image: from.image,
});
