import {Component, computed, OnDestroy, OnInit, signal} from '@angular/core';
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {Title} from "@angular/platform-browser";
import {toPromise} from "../../types/resolvable";
import {TranslatorService} from "../../services/translator.service";
import {FooterColorService} from "../../services/footer-color.service";
import {InlineSvgComponent} from "../../components/inline-svg/inline-svg.component";
import {JsonPipe, KeyValuePipe} from "@angular/common";
import {TranslocoPipe} from "@jsverse/transloco";
import {ToggleCheckboxComponent} from "../../components/toggle-checkbox/toggle-checkbox.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatabaseService, StorageType} from "../../services/database.service";
import {debounceTime} from "rxjs";
import {Subscriptions} from "../../helper/subscriptions";
import {AiHordeService} from "../../services/ai-horde.service";
import {HordeUser} from "../../types/horde-user";
import {toSignal} from "@angular/core/rxjs-interop";
import {FormatNumberPipe} from "../../pipes/format-number.pipe";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [
    TranslocoMarkupComponent,
    InlineSvgComponent,
    KeyValuePipe,
    TranslocoPipe,
    ToggleCheckboxComponent,
    ReactiveFormsModule,
    JsonPipe,
    FormatNumberPipe,
    RouterLink
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss'
})
export class TransferComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscriptions();

  private exampleUsers = signal([
    'db0#1',
    'Tazlin#6572',
    'Rikudou#185676',
  ]);

  public exampleUser = computed(() => {
    return this.exampleUsers()[Math.floor(Math.random()*this.exampleUsers().length)];
  });
  public currentUser = signal<HordeUser | null>(null);
  public sentSuccessfully = signal<boolean | null>(null);
  public maximumKudos = computed(() => {
    if (!this.currentUser()) {
      return null;
    }

    return this.currentUser()!.kudos;
  });
  public educatorAccounts = toSignal(this.aiHorde.getEducatorAccounts());
  public fragment = signal<string|null>(null);

  public form = new FormGroup({
    apiKey: new FormControl<string>('', [Validators.required]),
    remember: new FormControl<boolean>(false),
    targetUser: new FormControl<string>('', [Validators.required]),
    kudosAmount: new FormControl<number>(1, [Validators.required, Validators.min(1)]),

    educatorAccount: new FormControl<number | null>(null),

    apiKeyValidated: new FormControl<boolean | null>(null, [Validators.requiredTrue]),
    targetUserValidated: new FormControl<boolean | null>(null, [Validators.requiredTrue]),
    kudosAmountValidated: new FormControl<boolean | null>(null, [Validators.requiredTrue]),
  });

  constructor(
    private readonly title: Title,
    private readonly translator: TranslatorService,
    private readonly footerColor: FooterColorService,
    private readonly database: DatabaseService,
    private readonly aiHorde: AiHordeService,
    public readonly activatedRoute: ActivatedRoute,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.title.setTitle(await toPromise(this.translator.get('transfer')) + ' | ' + await toPromise(this.translator.get('app_title')));
    this.footerColor.dark.set(true);

    const remember = this.database.get('remember_api_key', true);
    const apiKey = this.database.get('api_key', remember ? StorageType.Permanent : StorageType.Session);

    this.subscriptions.add(this.form.controls.apiKey.valueChanges.subscribe(() => {
      this.form.patchValue({apiKeyValidated: null});
    }));
    this.subscriptions.add(this.form.controls.targetUser.valueChanges.subscribe(() => {
      this.form.patchValue({targetUserValidated: null});
    }));
    this.subscriptions.add(this.form.controls.kudosAmount.valueChanges.subscribe(kudosAmount => {
      kudosAmount ??= 0;
      this.form.patchValue({kudosAmountValidated: this.maximumKudos() !== null && kudosAmount <= this.maximumKudos()!});
    }));
    this.subscriptions.add(this.form.controls.educatorAccount.valueChanges.subscribe(accountId => {
      // @ts-ignore
      if (accountId === 'null') {
        accountId = null;
      }

      if (!accountId) {
        this.form.controls.targetUser.enable();
        this.form.patchValue({targetUser: ''});
        return;
      }

      // @ts-ignore
      accountId = Number(accountId);
      const account = this.educatorAccounts()!.filter(account => account.id === accountId)[0];

      this.form.controls.targetUser.disable();
      this.form.patchValue({targetUser: account.username});
    }));

    this.subscriptions.add(this.form.controls.apiKey.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(async apiKey => {
      if (!apiKey) {
        return;
      }

      this.currentUser.set(await toPromise(this.aiHorde.getUserByApiKey(apiKey)));
      this.form.patchValue({apiKeyValidated: this.currentUser() !== null});
    }));
    this.subscriptions.add(this.form.controls.targetUser.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(async targetUser => {
      if (!targetUser) {
        return;
      }

      const parts = targetUser.split('#');
      if (parts.length !== 2) {
        this.form.patchValue({targetUserValidated: false});
        return;
      }

      const id = Number(parts[1]);
      const user = await toPromise(this.aiHorde.getUserById(id));
      this.form.patchValue({targetUserValidated: user !== null && targetUser === user.username});
    }));

    this.form.patchValue({
      remember: remember,
    });
    if (apiKey) {
      this.form.patchValue({
        apiKey: apiKey,
      });
    }

    this.subscriptions.add(this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.database.store('remember_api_key', value.remember ?? false);
      this.database.store('api_key', value.apiKey ?? '', value.remember ? StorageType.Permanent : StorageType.Session);

      this.sentSuccessfully.set(null);
    }));

    this.subscriptions.add(this.activatedRoute.fragment.subscribe(fragment => {
      this.fragment.set(fragment);
      if (fragment) {
        document.querySelector(`#${fragment}`)?.scrollIntoView();
      }
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public async transfer(): Promise<void> {
    this.sentSuccessfully.set(null);
    if (!this.form.valid) {
      return;
    }

    const success = await toPromise(this.aiHorde.transferKudos(
      this.form.value.apiKey!,
      this.form.controls.targetUser.value!,
      this.form.value.kudosAmount!,
    ));
    this.sentSuccessfully.set(success);
  }
}
