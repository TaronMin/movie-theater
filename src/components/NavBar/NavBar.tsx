import { useEffect } from "react";
import { getIconUrl } from "../../utils/getUrlImg";
import "./style.css";


const navbarItems = [
  {
    imgName: "search.png",
    option: "Search",
  },
  {
    imgName: "home.png",
    option: "Home",
  },
  {
    imgName: "movie.png",
    option: "TV Shows",
  },
  {
    imgName: "list.png",
    option: "Movies",
  },
  {
    imgName: "history.png",
    option: "Watch Later",
  },
];

const NavBar = () => {
  useEffect(() => {
    const navContainer: HTMLDivElement =
      document.querySelector(".navbar__container")!;

    const navContent: HTMLDivElement =
      document.querySelector(".navbar__content")!;

    navContent.addEventListener("mouseenter", () => {
      navContainer.classList.add("show_navbar_details");
    });

    navContent.addEventListener("mouseleave", () => {
      navContainer.classList.remove("show_navbar_details");
    });
  }, []);

  return (
    <div className="navbar__container">
      <div className="navbar__content">
        <ul className="navbar__list">
          {navbarItems.map(
            (val: { imgName: string; option: string }, index: number) => (
              <li key={index}>
                <img src={getIconUrl(val.imgName)} alt={`Image ${index + 1}`} />
                <span>{val.option}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
