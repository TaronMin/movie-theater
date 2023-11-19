import { useState, useEffect } from "react";
import { TrendingFilm } from "../../types/TrendingFilm";
import { getMovieData } from "../../service/films.service";
import { getImgUrl } from "../../utils/getUrlImg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

type PropTypes = {
  showMovie: Function;
};

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 5,
};

const FilmTrending: React.FC<PropTypes> = ({ showMovie }) => {
  const [trendingFilms, setTrendingFilms] = useState<TrendingFilm[] | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const { data } = await getMovieData();
      setTrendingFilms(data.TendingNow);
    })();
  }, []);

  return (
    <div className="trending__container">
      <p className="trending__header">Trending Now</p>
      <div className="trending__content">
        <Slider {...settings}>
          {trendingFilms?.map((movie: TrendingFilm, idx: number) => {
            return (
              <div
                className="trending__item"
                key={movie.Id}
              >
                <img
                  onClick={() => showMovie(movie)}
                  src={getImgUrl(`film-${idx + 1}`)}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
export default FilmTrending;
