type Expertises = string[];

export type Mentor = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  companyLogoUrl: string;
  shortDescription: string;
  longDescription: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  expertises: Expertises;
};
