import {Subscription} from "rxjs";

export class Subscriptions {
  private subscriptions: Subscription[];

  constructor(...subscriptions: Subscription[]) {
    this.subscriptions = subscriptions;
  }

  public add(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  public unsubscribe(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.subscriptions = [];
  }
}
