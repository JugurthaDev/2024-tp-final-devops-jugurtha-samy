import { Film } from "@/core/film";
import { Vote } from "@/core/vote";

type HTTPMethod = "GET" | "POST";

const voteApiBaseUrl = "http://localhost:8080";

function callVoteApi<ExpectedResponse, Body = unknown>(
  method: HTTPMethod,
  uri: string,
  body?: Body,
): Promise<ExpectedResponse> {
  return fetch(`${voteApiBaseUrl}/${uri}`, {
    method,
    headers: {
      ...(body
        ? {
            "Content-Type": "application/json",
          }
        : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
    .then((response) => response.json())
    .then((json) => json as ExpectedResponse)
    .catch((error) => {
      throw new Error(`Failed to call vote api: ${error}`);
    });
}

type VoteApiMovieDto = {
  title: string;
  imdbId: string;
  coverImageUrl: string;
  releaseDate: string;
  genres: Array<string>;
  summary: string;
  votes: Record<Vote, number>;
};

function voteApiMovieDtoToDomain(dto: VoteApiMovieDto): Film {
  return {
    title: dto.title,
    imdbId: dto.imdbId,
    imdbUrl: `https://www.imdb.com/title/${dto.imdbId}`,
    coverImageUrl: dto.coverImageUrl,
    releaseDate: dto.releaseDate,
    genres: dto.genres,
    summary: dto.summary,
    votes: dto.votes,
  };
}

export function getMovies(): Promise<Film[]> {
  return callVoteApi<Array<VoteApiMovieDto>>("GET", "movies").then((movies) =>
    movies.map(voteApiMovieDtoToDomain),
  );
}

export function voteForMovie(movieId: string, voteType: Vote): Promise<void> {
  return callVoteApi<void>("POST", `votes`, {
    imdbId: movieId,
    voteType,
  });
}

export function getMovieVotes(movieId: string): Promise<Vote[]> {
  return callVoteApi<Array<Vote>>("GET", `votes?imdbId=${movieId}`);
}
