/* eslint camelcase: 0 */

import VideoQuality from '@/MovieDBApi/VideoQuality';

interface IVideo {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  site: string
  size: VideoQuality
  type: string
}

export default IVideo;
