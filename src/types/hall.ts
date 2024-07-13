export type hall = {
  id?: number;
  name?: string;
  capacity?: string;
  price_hour?: string;
  checked?: string;
  city?: string;
  location?: string;
  details?: string;
  images?: [];
  cover_image?: string;
  pdf?: string;
  video?: string;
  user_id?: number;
};

export type hallrate = {
  length?: boolean;
  id?: number;
  userid?: number;
  hallid?: number;
  rate?: number;
};
