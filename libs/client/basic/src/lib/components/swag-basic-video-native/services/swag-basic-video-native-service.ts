import {
  ISubscriptionEvent,
  ISwagBasicActionConfig,
  SwagBasicUiUtils
} from '../../../services';
import {
  ISwagBasicVideoEventArgs,
  ISwagBasicVideoPlayer,
  ISwagBasicVideoSetup,
  SwagBasicVideoEventName
} from '../../models';

import { ISwagBasicNativeEventRegister } from '../models';
import { Subscription } from 'rxjs';

export class SwagBasicVideoNativeService implements ISwagBasicVideoPlayer {
  private _videoPlayer: HTMLVideoElement;
  private _eventRegister: ISwagBasicNativeEventRegister;

  play(id?: string): void {
    !id
      ? this._videoPlayer.play()
      : this.matchesPlayer(id)
      ? this._videoPlayer.play()
      : null;
  }

  pause(id?: string): void {
    !id
      ? this._videoPlayer.pause()
      : this.matchesPlayer(id)
      ? this._videoPlayer.pause()
      : null;
  }
  mute(id?: string): void {
    !id
      ? (this._videoPlayer.muted = true)
      : this.matchesPlayer(id)
      ? (this._videoPlayer.muted = true)
      : null;
  }
  unmute(id?: string): void {
    !id
      ? (this._videoPlayer.muted = false)
      : this.matchesPlayer(id)
      ? (this._videoPlayer.muted = false)
      : null;
  }
  setVolume(level: number, id?: string): void {
    !id
      ? this._setVolume(level)
      : this.matchesPlayer(id)
      ? this._setVolume(level)
      : null;
  }
  seek(currentTime: number, id?: string): void {
    !id
      ? (this._videoPlayer.currentTime = currentTime)
      : this.matchesPlayer(id)
      ? (this._videoPlayer.currentTime = currentTime)
      : null;
  }
  replay(id?: string): void {
    this.pause(id);
    this.seek(0, id);
    this.play(id);
  }

  matchesPlayer(id: string): boolean {
    return !!id && id === this._videoPlayer.id;
  }

  destroy(id?: string): void {
    !id
      ? this._unregister()
      : this.matchesPlayer(id)
      ? this._unregister()
      : null;
  }

  setUp(
    element: HTMLVideoElement,
    setup: ISwagBasicVideoSetup
  ): ISwagBasicNativeEventRegister {
    const playEventRegister = this.setUpPlay(element, setup);
    const pauseEventRegister = this.setUpPause(element, setup);
    const muteEventRegister = this.setUpMute(element, setup);
    const unmuteEventRegister = this.setUpUnmute(element, setup);
    const replayEventRegister = this.setUpReplay(element, setup);
    const seekEventRegister = this.setUpSetSeek(element, setup);
    const setVolumeRegister = this.setUpSetVolume(element, setup);
    const setTimeupdateRegister = this.setUpTimeupdate(element, setup);
    const destroyRegister = this.setUpDestroy(element, setup);
    const register: ISwagBasicNativeEventRegister = {
      play: playEventRegister,
      pause: pauseEventRegister,
      mute: muteEventRegister,
      unmute: unmuteEventRegister,
      replay: replayEventRegister,
      seek: seekEventRegister,
      setVolume: setVolumeRegister,
      destroy: destroyRegister,
      timeupdate: setTimeupdateRegister
    };

    this._eventRegister = register;
    this._videoPlayer = element;

    this.setUpPlayer(element, setup);

    return register;
  }

  setUpPlay(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent {
    const eventBus = setup.eventBus;

    return eventBus.on(
      SwagBasicVideoEventName.Play,
      (args: ISwagBasicVideoEventArgs) => {
        this.play(args.id);
      }
    );
  }
  setUpPause(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent {
    const eventBus = setup.eventBus;

    return eventBus.on(
      SwagBasicVideoEventName.Pause,
      (args: ISwagBasicVideoEventArgs) => {
        this.pause(args.id);
      }
    );
  }
  setUpMute(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent {
    const eventBus = setup.eventBus;

    return eventBus.on(
      SwagBasicVideoEventName.Mute,
      (args: ISwagBasicVideoEventArgs) => {
        this.mute(args.id);
        this._muteListener(element, setup);
      }
    );
  }

  setUpUnmute(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent {
    const eventBus = setup.eventBus;

    return eventBus.on(
      SwagBasicVideoEventName.Unmute,
      (args: ISwagBasicVideoEventArgs) => {
        this._unmuteListener(element, setup);
        this.unmute(args.id);
      }
    );
  }
  setUpSetVolume(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent {
    const eventBus = setup.eventBus;

    return eventBus.on(
      SwagBasicVideoEventName.SetVolume,
      (args: ISwagBasicVideoEventArgs) => {
        const level: number = !!args.level
          ? args.level
          : this._videoPlayer.volume;

        this.setVolume(level, args.id);
      }
    );
  }
  setUpSetSeek(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent {
    const eventBus = setup.eventBus;

    return eventBus.on(
      SwagBasicVideoEventName.Seek,
      (args: ISwagBasicVideoEventArgs) => {
        const currentTime: number =
          !!args && !!args.currentTime
            ? args.currentTime
            : this._videoPlayer.currentTime;

        this.seek(currentTime, args.id);
      }
    );
  }
  setUpReplay(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent {
    const eventBus = setup.eventBus;

    return eventBus.on(
      SwagBasicVideoEventName.Replay,
      (args: ISwagBasicVideoEventArgs) => {
        this.replay(args.id);
      }
    );
  }

  setUpTimeupdate(element: any, setup: ISwagBasicVideoSetup): Subscription {
    const eventBus = setup.eventBus;
    const self = this;

    return setup.timeupdate.subscribe(() => {
      !this._videoPlayer.paused
        ? eventBus.emit(
            SwagBasicVideoEventName.Timeupdate,
            self._createTimestamp()
          )
        : null;
    });
  }

  setUpDestroy(
    element: any,
    setup: ISwagBasicVideoSetup
  ): () => ISubscriptionEvent {
    const eventBus = setup.eventBus;

    return eventBus.on(
      SwagBasicVideoEventName.Destroy,
      (args: ISwagBasicVideoEventArgs) => {
        this.destroy(args.id);
      }
    );
  }

  setUpPlayer(
    videoPlayer: HTMLVideoElement,
    setup: ISwagBasicVideoSetup
  ): void {
    videoPlayer.addEventListener('loadeddata', () => {
      this._readyListener(videoPlayer, setup);
    });

    videoPlayer.addEventListener('play', () => {
      this._playListener(videoPlayer, setup);
    });
    videoPlayer.addEventListener('pause', () => {
      this._pauseListener(videoPlayer, setup);
    });

    videoPlayer.addEventListener('volumechange', () => {
      this._volumeChangeListener(videoPlayer, setup);
    });
  }

  private _readyListener(
    videoPlayer: HTMLVideoElement,
    setup: ISwagBasicVideoSetup
  ): void {
    const eventBus = setup.eventBus;
    const player = setup.player;
    const actionProcessor = setup.actionProcessor;
    const basedArgs: ISwagBasicVideoEventArgs = { id: videoPlayer.id };
    const onReadyActions = !!player && !!player.onReady ? player.onReady : [];
    const playArgs: ISwagBasicVideoEventArgs = {
      ...basedArgs,
      actions: onReadyActions
    };

    actionProcessor.process(onReadyActions).then(() => {
      eventBus.emit(SwagBasicVideoEventName.Ready, playArgs);
    });
  }

  private _playListener(
    videoPlayer: HTMLVideoElement,
    setup: ISwagBasicVideoSetup
  ): void {
    const eventBus = setup.eventBus;
    const player = setup.player;
    const actionProcessor = setup.actionProcessor;
    const basedArgs: ISwagBasicVideoEventArgs = { id: videoPlayer.id };
    const onPlayActions = !!player && !!player.onPlay ? player.onPlay : [];
    const playArgs: ISwagBasicVideoEventArgs = {
      ...basedArgs,
      actions: onPlayActions
    };

    actionProcessor.process(onPlayActions);
    eventBus.emit(SwagBasicVideoEventName.Play, playArgs);
  }

  private _pauseListener(
    videoPlayer: HTMLVideoElement,
    setup: ISwagBasicVideoSetup
  ): void {
    const eventBus = setup.eventBus;
    const player = setup.player;
    const actionProcessor = setup.actionProcessor;
    const basedArgs: ISwagBasicVideoEventArgs = { id: videoPlayer.id };
    const onPauseActions: ISwagBasicActionConfig[] =
      !!player && !!player.onPause ? player.onPause : [];
    const pauseArgs: ISwagBasicVideoEventArgs = {
      ...basedArgs,
      actions: onPauseActions
    };

    actionProcessor.process(onPauseActions);
    eventBus.emit(SwagBasicVideoEventName.Pause, pauseArgs);
  }

  private _muteListener(
    videoPlayer: HTMLVideoElement,
    setup: ISwagBasicVideoSetup
  ): void {
    const eventBus = setup.eventBus;
    const player = setup.player;
    const actionProcessor = setup.actionProcessor;
    const basedArgs: ISwagBasicVideoEventArgs = { id: videoPlayer.id };
    const onMuteActions: ISwagBasicActionConfig[] =
      !!player && !!player.onMute ? player.onMute : [];
    const playArgs: ISwagBasicVideoEventArgs = {
      ...basedArgs,
      actions: onMuteActions
    };

    actionProcessor.process(onMuteActions);
  }

  private _unmuteListener(
    videoPlayer: HTMLVideoElement,
    setup: ISwagBasicVideoSetup
  ): void {
    const player = setup.player;
    const actionProcessor = setup.actionProcessor;
    const onUnmuteActions: ISwagBasicActionConfig[] =
      !!player && !!player.onUnmute ? player.onUnmute : [];

    actionProcessor.process(onUnmuteActions);
  }

  private _volumeChangeListener(
    videoPlayer: HTMLVideoElement,
    setup: ISwagBasicVideoSetup
  ): void {
    const eventBus = setup.eventBus;
    const player = setup.player;
    const actionProcessor = setup.actionProcessor;
    const basedArgs: ISwagBasicVideoEventArgs = { id: videoPlayer.id };
    const onVolumeChangeActions: ISwagBasicActionConfig[] =
      !!player && !!player.onVolumeChange ? player.onVolumeChange : [];

    actionProcessor.process(onVolumeChangeActions);
  }

  private _createTimestamp(): ISwagBasicVideoEventArgs {
    const id: string = `${this._videoPlayer.id}`;
    const currentTime: number = +`${this._videoPlayer.currentTime}`;
    const duration: number = +`${this._videoPlayer.duration}`;
    const progress: number = currentTime / duration;
    const timestamp: string = SwagBasicUiUtils.createTimestamp(currentTime);
    const durationTimestamp: string = SwagBasicUiUtils.createTimestamp(
      duration
    );

    return {
      id,
      currentTime,
      duration,
      progress,
      durationTimestamp,
      timestamp
    };
  }

  private _setVolume(level: number): void {
    this._videoPlayer.muted = false;
    this._videoPlayer.volume = level;
  }

  private _unregister(): void {
    this._eventRegister.play();
    this._eventRegister.pause();
    this._eventRegister.mute();
    this._eventRegister.unmute();
    this._eventRegister.seek();
    this._eventRegister.setVolume();
    this._eventRegister.replay();
    this._eventRegister.destroy();
    this._eventRegister.timeupdate.unsubscribe();
  }
}
