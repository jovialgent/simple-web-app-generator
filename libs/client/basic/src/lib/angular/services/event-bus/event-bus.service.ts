import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ISubscriptionEvent } from './models';

@Injectable({
  providedIn: 'root'
})
export class NgSwagBasicEventBusService extends Subject<any> {
  private _listeners: ISubscriptionEvent[] = [];

  constructor() { super() }

  public one(eventName: string, listener: (arg?: unknown) => {} | void): void {
    const subscriptionEvent: () => ISubscriptionEvent = this.on(eventName, (args?: unknown) => {
      listener(args);
      subscriptionEvent();
    });
  }

  public on(eventName: string, listener: (arg?: unknown) => {} | void): () => ISubscriptionEvent {
    const newListner: ISubscriptionEvent = this._createSubscriptionEvent(eventName, listener);

    this._listeners = [...this._listeners, newListner];

    return (): ISubscriptionEvent => {
      const currentListeners: ISubscriptionEvent[] = this._listeners.filter((subscriptionEvent: ISubscriptionEvent) => subscriptionEvent.listener !== listener);
      const unsubscribeListener: ISubscriptionEvent = this._listeners.find((subscriptionEvent: ISubscriptionEvent) => subscriptionEvent.listener === listener);

      !!unsubscribeListener ? unsubscribeListener.subscription.unsubscribe() : null;
      this._listeners = currentListeners;

      return unsubscribeListener;
    }
  }

  public emit(eventName, args?: unknown) {
    this.next({ eventName, args });
  }
  private _createSubscriptionEvent(eventName: string, listener: (args?: unknown) => {} | void): ISubscriptionEvent {
    const subscription: Subscription = this.subscribe((eventObj) => {
      eventObj.eventName === eventName ? listener(eventObj.args) : null;
    });

    return {
      eventName,
      listener,
      subscription
    }
  }
}
