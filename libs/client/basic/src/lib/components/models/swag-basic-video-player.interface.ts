import { ISubscriptionEvent } from '../../services';
import { ISwagBasicVideoEventRegister } from './swag-basic-video-event-register.interface';
import { ISwagBasicVideoSetup } from './swag-basic-video-setup.interface';
import { Subscription } from 'rxjs';

export interface ISwagBasicVideoPlayer {
  play(id?: string): void;
  pause(id?: string): void;
  mute(id?: string): void;
  unmute(id?: string): void;
  setVolume(level: number, id?: string): void;
  seek(currentTime: number, id?: string): void;
  replay(id?: string): void;
  matchesPlayer(id: string): boolean;
  destroy(id?: string): void;
  setUp(
    element: any,
    setup: ISwagBasicVideoSetup
  ): ISwagBasicVideoEventRegister;
  setUpPlay(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent;
  setUpPause(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent;
  setUpMute(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent;
  setUpUnmute(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent;
  setUpSetVolume(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent;
  setUpSetSeek(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent;
  setUpReplay(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent;
  setUpTimeupdate(element: any, setup: ISwagBasicVideoSetup): Subscription;
  setUpDestroy(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent;
  setUpPlayer(
    element:any,
    setup: ISwagBasicVideoSetup
  ) : void
}
