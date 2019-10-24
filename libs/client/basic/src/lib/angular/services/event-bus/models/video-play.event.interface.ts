import { VideoEventNames } from './video-event-name.event.enum';

type play = VideoEventNames.Play;

export interface IVideoPlayEvent {
    eventName: play;

}