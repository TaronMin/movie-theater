import { useEffect, useState } from "react";
import FilmTrending from "../FilmTrending/FilmTrending";
import { TFeatured } from "../../types/Featured";
import Movie from "../Modals/Movie/Movie";
import { getMovieData } from "../../service/films.service";
import { formatTime } from "../../utils/timeFormatter";
import { TrendingFilm } from "../../types/TrendingFilm";
import "./style.css";

const imageUrl = (img: string): string =>
  `${import.meta.env.VITE_BASE_URL}/src/assets/film-images/${img}`;

const Home: React.FC = () => {
  const [featured, setFeatured] = useState<TFeatured | TrendingFilm | null>(
    null
  );
  const [filmPoster, setFilmPoster] = useState<string>(
    "FeaturedCoverImage.png"
  );

  const [movieUrl, setMovieUrl] = useState<string | null>(null);
  const [isShowMovie, setIsShowMovie] = useState<boolean>(false);

  const getTrendingItem = async (id: number) => {
    const { data } = await getMovieData();
    const trendingMovie = data.TendingNow.find(
      (item: TrendingFilm) => +item.Id === id
    );
    setFeatured(trendingMovie);
    setFilmPoster(`film-${id}.png`);
  };

  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem("movieId") as string);
    !Boolean(id)
      ? (async () => {
          const { data } = await getMovieData();
          setFeatured(data.Featured);
        })()
      : getTrendingItem(id);
  }, []);

  useEffect(() => {
    featured?.VideoUrl ? setMovieUrl(featured.VideoUrl) : setMovieUrl(null);
  }, [featured]);
  return (
    <>
      <div
        className="home__container"
        style={{
          backgroundImage: `url(${imageUrl(filmPoster)})`,
        }}
      >
        <div className="home__content">
          <div className="navbar__left"></div>
          {featured && (
            <div className="film__content">
              <div className="film__about">
                <p className="movie">MOVIE</p>
                <img
                  className="featured_title_image"
                  src={imageUrl(featured.TitleImage)}
                  alt=""
                />
                <p className="film__info">
                  <span>{featured.ReleaseYear}</span>
                  <span>{featured.MpaRating}</span>
                  <span>{formatTime(featured.Duration)}</span>
                </p>
                <p className="film__description">{featured.Description}</p>
                <div className="btns-container">
                  <button
                    type="button"
                    className="play_btn"
                    onClick={() => setIsShowMovie(true)}
                  >
                    Play
                  </button>
                  <button type="button" className="more_info">
                    More Info
                  </button>
                </div>
              </div>
              <footer>
                <FilmTrending
                  showMovie={(movie: TrendingFilm) => {
                    setFeatured(movie);
                    setFilmPoster(movie.CoverImage);
                    sessionStorage.setItem("movieId", `${movie.Id}`);
                  }}
                />
              </footer>
            </div>
          )}
        </div>
      </div>
      {movieUrl && isShowMovie && (
        <Movie url={movieUrl} closeMovie={() => setIsShowMovie(false)} />
      )}
    </>
  );
};

export default Home;
