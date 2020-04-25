export interface ItunesMusic {
  wrapperType: string;
  kind: string;
  trackId: number;
  artistName: string;
  trackName: string;
  trackCensoredName: string;
  trackViewUrl: string;
  previewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  trackRentalPrice: number;
  collectionHdPrice: number;
  trackHdPrice: number;
  trackHdRentalPrice: number;
  releaseDate: Date;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  shortDescription: string;
  longDescription: string;
  hasITunesExtras: boolean;
  collectionId?: number;
  collectionName: string;
  collectionCensoredName: string;
  collectionArtistId?: number;
  collectionArtistViewUrl: string;
  collectionViewUrl: string;
  discCount?: number;
  discNumber?: number;
  trackCount?: number;
  trackNumber?: number;
  artistId?: number;
  collectionArtistName: string;
  artistViewUrl: string;
  isStreamable?: boolean;
  copyright: string;
  description: string;
}

export interface Results {
  resultCount: number;
  results: ItunesMusic[];
}
