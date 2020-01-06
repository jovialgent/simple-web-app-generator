import { ISubscriptionEvent } from '../../services';
import { Subscription } from 'rxjs';

export interface ISwagBasicVideoEventRegister {
  play: () => ISubscriptionEvent;
  pause: () => ISubscriptionEvent;
  mute: () => ISubscriptionEvent;
  unmute: () => ISubscriptionEvent;
  setVolume: () => ISubscriptionEvent;
  seek: () => ISubscriptionEvent;
  replay: () => ISubscriptionEvent;
  destroy: () => ISubscriptionEvent;
  timeupdate: Subscription;
}
