import { Component, signal, ViewEncapsulation } from '@angular/core';
import {toPromise} from "../../types/resolvable";

import {AiHordeService} from "../../services/ai-horde.service";

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {
  public terms = signal<string>('');

  constructor(
    private readonly aiHorde: AiHordeService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.terms.set(await toPromise(this.aiHorde.getTerms()));
  }

}
