import { FEATURED_CATEGORIES } from "@/utils/enums";

export type CategoryItemApi = {
    category_id: string;
    name: string;
};

export type CategoryItemModel = {
    categoryId: string;
    name: string;
};

export const normalizeCategoryItem = (from: CategoryItemApi) => ({
    categoryId: from.category_id,
    name: from.name,
});

export type ActiveFeaturedCategory = keyof typeof FEATURED_CATEGORIES;
