import React, { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./style.css";

type PropTypes = {
  url: string;
  closeMovie: Function;
};
const Movie: React.FC<PropTypes> = ({ url, closeMovie }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      const modalContainer = document.querySelector(".modal__container");

      if (
        modalContainer &&
        !modalContainer.contains(event.currentTarget as Node) &&
        event.target === modalContainer
      ) {
        setShowModal(false);
        closeMovie(false);
      }
    };

    if (url) {
      setShowModal(true);
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [url]);
  return (
    <>
      {showModal ? (
        <div className="modal">
          {createPortal(
            <div className="modal__container">
              <div className="modal__content">
                <video controls>
                  <source src={url} type="video/mp4" />
                </video>
              </div>
            </div>,
            document.body
          )}
        </div>
      ) : null}
    </>
  );
};

export default memo(Movie);
