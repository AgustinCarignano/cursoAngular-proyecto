import { HomeCardText } from '../enums/home-card.enum';

export interface HomeCardData {
  title: HomeCardText;
  content: string | number;
  BbtnLink: string[];
}
