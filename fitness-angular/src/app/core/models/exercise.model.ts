export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
  gifUrl: string;
}

export interface VideoItem {
  video: {
    videoId: string;
    title: string;
    thumbnails: Array<{ url: string }>;
    channelName: string;
  };
}
