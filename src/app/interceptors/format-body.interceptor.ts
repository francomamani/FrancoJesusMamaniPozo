import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { snakeToCamel, camelToSnake } from '../helpers/format';
import { map } from 'rxjs';
export const formatBodyInterceptor: HttpInterceptorFn = (req, next) => {
  const snakeCaseRequest = req.clone({
    body: camelToSnake(req.body),
  });
  return next(snakeCaseRequest).pipe(
    map(<T>(event: HttpEvent<T>) => {
      if (event instanceof HttpResponse) {
        return event.clone({
          body: snakeToCamel(event.body),
        });
      }
      return event;
    })
  );
};
