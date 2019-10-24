import { Subscription } from "rxjs";

export interface ISubscriptionEvent {
    eventName: string;
    subscription: Subscription;
    listener(args?: unknown): any | void
}