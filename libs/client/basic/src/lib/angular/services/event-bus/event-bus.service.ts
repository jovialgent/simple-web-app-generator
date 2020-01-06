import { EventBusService } from '../../../services';
import { ISubscriptionEvent } from './models';
import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class NgSwagBasicEventBusService {
  private _listeners: ISubscriptionEvent[] = [];
  private _eventBus: EventBusService;

  constructor() {
    this._eventBus = new EventBusService();
  }

  public one(eventName: string, listener: (arg?: unknown) => {} | void): void {
    this._eventBus.one(eventName, listener);
  }

  public on(
    eventName: string,
    listener: (arg?: unknown) => {} | void
  ): () => ISubscriptionEvent {
    return this._eventBus.on(eventName, listener);
  }

  public emit(eventName, args: unknown) {
    this._eventBus.emit(eventName, args);
  }

  public getEventBus(): EventBusService {
    return this._eventBus;
  }

  public setEventBus(eventBus: EventBusService): EventBusService {
    this._eventBus = cloneDeep(eventBus);

    return this._eventBus;
  }
}
