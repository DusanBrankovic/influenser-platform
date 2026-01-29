export type Influencer = {
  userId: number;
  name: string;
  headline: string | null;
  experience: number | null;
  isPrivate: boolean;
  profileUrl: string | null;
  profileImage: string | null;
  industries: string[];
  values: string[];
};

export type SearchQueryParams = {
    name?: string;
    industry?: string;
    value?: string;
};

