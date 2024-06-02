import {Injectable, model} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterColorService {
  public readonly dark = model(false);
}
