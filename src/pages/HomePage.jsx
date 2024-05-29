import { PhotoGalleryComponent } from "../components/PhotoGalleryComponent"
import { SearchBarComponent } from "../components/SearchBarComponent"
import { ChipsComponent } from "../components/ChipsComponent"

export const HomePage = () => {  
  const searchWords = [
    "naturaleza", "paisaje", "ciudad", "viaje", "playa", "montaña", 
    "arquitectura", "urbano", "arte", "colorido", "abstracto", 
    "moderno", "antiguo", "fotografía", "textura", "animales", 
    "aventura", "cultura", "comida", "tecnología", "negocios", 
    "creativo", "inspiración", "construcción", "patrón", "minimalista", 
    "cielo", "agua", "reflejo", "luces", "sombras", "movimiento", 
    "tranquilidad", "energía", "pasión", "alegría", "emoción", 
    "misterio", "diseño", "celebración", "relajación", "innovación", 
    "equilibrio", "contraste"
  ];
  return (
    <div className="home">
      <section className="home__header">
        <div className="home__header__content">
          <h1 className="home__header__content__title">Increíbles Imágenes Gratis Para Descargar</h1>
          <p className="home__header__content__subtitle">Nuestro banco de imágenes tiene más de 1 millón de imágenes y videos compartidos por nuestra talentosa comunidad.</p>
          <div className="home__header__content__search-bar-container">
          <SearchBarComponent/>
          </div>
        </div>
      </section>
      <section className="home__chips-container">
        <ChipsComponent searchWords={searchWords}/>
      </section>
      <PhotoGalleryComponent/>
    </div>
  )
}
