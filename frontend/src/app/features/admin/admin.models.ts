export interface Theater {
  id: number;
  name: string;
  location: string;
}

export interface Movie {
  id: number;
  title: string;
  genre: string;
}

export interface Show {
  id: number;
  theaterId: number;
  movieId: number;
  time: string;
}
