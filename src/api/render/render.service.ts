import { Injectable } from '@nestjs/common';
import { renderMedia } from '@remotion/renderer';
import { join } from 'path';
import { VideoConfig } from 'remotion';

@Injectable()
export class RenderService {
  async renderVideo(data: any): Promise<string> {
    const composition: VideoConfig = {
      id: 'MyVideo',
      width: 1920,
      height: 1080,
      fps: 30,
      durationInFrames: 300,
      defaultCodec: 'h264',
      defaultProps: {
        title: data.name,
        description: data.description,
        poster: data.poster,
        background: data.background,
        avatar: data.avatar,
        audio: data.audio,
        model: data.model,
      },
      props: {
        title: data.name,
        description: data.description,
        poster: data.poster,
        background: data.background,
        avatar: data.avatar,
        audio: data.audio,
        model: data.model,
      },
    };

    const outputLocation = join(__dirname, '..', '..', 'output', 'video.mp4');

    await renderMedia({
      composition,
      serveUrl: 'http://localhost:3001',
      codec: 'h264',
      outputLocation,
    });

    return outputLocation;
  }
}
