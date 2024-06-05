import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FetchRandomThunk } from '../../slices/RandomSlice/randomThunk';
import { resetRandomStateData, addOneToRandomStatePage } from '../../slices/RandomSlice/RandomSlice';
import { SearchBarComponent } from '../../components/SearchBarComponent/SearchBarComponent';
import { GalleryCardComponent } from '../../components/GalleryCardComponent/GalleryCardComponent';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import './HomePage.css';
import './PhotoGalleryComponent.css';

export const HomePage = () => {
  const { data: randomData, status: randomStatus, error: randomError, page, count } = useSelector(state => state.random);
  const dispatch = useDispatch();
  const bottomRef = useRef(null);
  const galleryRef = useRef(null);
  const [images, setImages] = useState([]);
  const [ isNextPage , setIsNextPage]= useState(false);

  useEffect(() => {
    if (randomStatus === 'idle') {
      dispatch(resetRandomStateData());
      dispatch(FetchRandomThunk({ page, count }));
    } else if (randomStatus === 'fulfilled') {
      setImages(randomData);
      console.log(randomData);
    } else if (randomStatus === 'rejected') {
      console.log(randomError);
      toast.error('API request limit reached, try searching for photos again in 1 hour', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [randomStatus]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsNextPage(true)
      } else {
        setIsNextPage(false)

      }
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [bottomRef, page, randomStatus, dispatch]);
useEffect(()=>{
  if (isNextPage && page < 12 && randomStatus === 'fulfilled') {
    
    dispatch(FetchRandomThunk({ page, count }));
    dispatch(addOneToRandomStatePage())
  } 
},[isNextPage]);
  useEffect(() => {
    const resizeAllMasonryItems = () => {
      const grid = galleryRef.current;
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      const columnGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-column-gap'));
      const columnWidth = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-template-columns').split(' ')[0]); 
      images.forEach(image => resizeMasonryItem(image,rowGap,rowHeight,columnGap,columnWidth));
    };

    const resizeMasonryItem = (image,rowGap,rowHeight,columnGap,columnWidth) => {
      const h2 = (columnWidth)*image.height/image.width;
      const rowSpan = Math.round((h2+ rowGap) / (rowHeight + rowGap));

      const item = document.getElementById(image.id);
      item.style.gridRowEnd = `span ${rowSpan}`;
    };
    resizeAllMasonryItems()
    window.addEventListener('resize', resizeAllMasonryItems);

    return () => {
      window.removeEventListener('resize', resizeAllMasonryItems);
    };
  }, [images]);

  return (
    <div className="home">
      <section className="home__header">
        <div className="home__header__content">
          <h1 className="home__header__content__title">Increíbles Imágenes Gratis Para Descargar</h1>
          <p className="home__header__content__subtitle">Nuestro banco de imágenes tiene más de 1 millón de imágenes y videos compartidos por nuestra talentosa comunidad.</p>
          <div className="home__header__content__search-bar-container">
            <SearchBarComponent />
          </div>
        </div>
      </section>
      <section className="home__chips-container"></section>
      <section className="gallery" ref={galleryRef}>
        {images.length > 0 && images.map((image, index) => (
          <GalleryCardComponent image={image} key={`${image.id}${index}`} />
        ))}
        {randomStatus === 'pending' && (
          <div className="simple-spinner">
            <span></span>
          </div>
        )}
      </section>
      <div className="bottom-ref" ref={bottomRef}></div>
    </div>
  );
};
