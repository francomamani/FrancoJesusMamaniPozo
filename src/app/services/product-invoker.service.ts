import { Injectable } from '@angular/core';
import { Command } from '../interfaces/command';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductInvokerService {
  executeCommand<T>(command: Command<T>): Observable<T> {
    return command.execute();
  }
}
