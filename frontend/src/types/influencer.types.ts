export type Influencer = {
  userId: number;
  name: string;
  description: string | null;
  nametag: string | null;
  experience: number | null;
  isPrivate: boolean;
  profileUrl: string | null;
  profilePicture: string | null;
  industries: string[];
  values: string[];
};

export type UpdateInfluencerDto = {
  name?: string | null;
  experience?: number | null;
  industries?: string[];
  values?: string[];
  description?: string;
  nametag?: string;
  contactMail?: string[];
  contactPhone?: string[];
  links?: string[]
};

export type SearchQueryParams = {
  name?: string;
  value?: string[];
  industry?: string[];
  experience_range?: number;
};


