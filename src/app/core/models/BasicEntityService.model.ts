import { Observable } from 'rxjs';
export interface BasicEntityService {
  getQuantity: () => Observable<number>;
}
