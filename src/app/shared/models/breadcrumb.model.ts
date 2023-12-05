import { Paths } from 'src/app/dashboard/enums/paths.enum';

export interface BreadCrumb {
  label: string;
  path: Paths[] | '';
}
