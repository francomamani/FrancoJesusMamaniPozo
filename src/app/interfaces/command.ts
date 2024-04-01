import { Observable } from 'rxjs';

export interface Command<T> {
  execute(): Observable<T>;
}
