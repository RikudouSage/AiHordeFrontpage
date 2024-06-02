import {lastValueFrom, Observable} from "rxjs";

export type Resolvable<T> = Promise<T> | Observable<T> | T;

export function toPromise<T>(resolvable: Resolvable<T>): Promise<T> {
  if (resolvable instanceof Promise) {
    return resolvable;
  }

  if (resolvable instanceof Observable) {
    return lastValueFrom(resolvable);
  }

  return Promise.resolve(resolvable);
}
