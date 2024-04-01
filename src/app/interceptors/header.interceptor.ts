import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithHeaders = req.clone({
    setHeaders: {
      authorId: '350',
    },
  });
  return next(reqWithHeaders);
};
