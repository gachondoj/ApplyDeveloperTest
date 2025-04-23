export interface ContentfulProduct {
  fields: {
    name: string;
    category: string;
    price?: number;
  };
}

export interface ContentfulResponse {
  items: ContentfulProduct[];
}
