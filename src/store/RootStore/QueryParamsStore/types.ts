import { Option } from '@/components/MultiDropdown/MultiDropdown';

export type ParamsFromStoresRaw = {
  [key: string]: Option[] | Option | string | number | undefined;
  category?: Option[];
  page?: string;
  per_page?: string;
  vs_currency?: Option;
  ids?: string;
  filter?: string;
  query?: string;
  order?: string;
  feature?: string;
};

export type ParamsFromStores = {
  [key: string]: string | undefined;
  category?: string;
  page?: string;
  per_page?: string;
  vs_currency?: string;
  ids?: string;
  filter?: string;
  query?: string;
  order?: string;
  feature?: string;
};

export enum ParamsEnum {
  CATEGORY = 'category',
  PAGE = 'page',
  PER_PAGE = 'per_page',
  VS_CURRENCY = 'vs_currency',
  IDS = 'ids',
  FILTER = 'filter',
  QUERY = 'query',
  ORDER = 'order',
  FEATURE = 'feature',
}
