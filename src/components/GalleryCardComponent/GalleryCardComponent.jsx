import downloadIcon from "../../public/download.svg";
import saveIcon from "../../public/save.svg";
import saveIconGreen from "../../public/save-green.svg";
import FileSaver from "file-saver";
import { useNavigate } from "react-router-dom";
import { useIsPhotoFav } from "../../hooks/useIsPhotoFav";
import "./GalleryCardComponent.css";

export const GalleryCardComponent = ({image}) => {
  const navigate = useNavigate();
  const { isPhotoFav, handleToggleFav } = useIsPhotoFav(image);

  const handleDownload = (event) => {
    event.stopPropagation();
    FileSaver.saveAs(image.urls.raw, "oxygen-photo.jpg");
  };

  const handleGalleryItemClick = () => {
    navigate(`/photo/${image.id}`, { state: { image } });
  };

  
  return(
    <figure className="gallery__item" id={image.id} onClick={() => handleGalleryItemClick()}>
      <button
        className="gallery__item__button gallery__item__button--download"
        onClick={(event) => handleDownload(event)}
      >
        <img src={downloadIcon} alt="download icon" className="gallery__item__button__img" />
      </button>
      <button
        className = {isPhotoFav? "gallery__item__button gallery__item__button--saved":"gallery__item__button"}         
        onClick={(event) => handleToggleFav(event)}
      >
        <img src={isPhotoFav ? saveIconGreen : saveIcon} alt="save icon" className="gallery__item__button__img" />
      </button>
      <img
        className="gallery__img"
        src={image.urls.small}
        alt={`Image ${image.id}`}
      />
    </figure>
  );
} 


