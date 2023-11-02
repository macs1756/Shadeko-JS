import React from 'react';
import './Galery.scss';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

function Galery({ images, closeLightbox, lightboxOpen }) {
	
	const [imagesClean, setImagesClean] = React.useState([]);

	React.useEffect(() => {
	  if (images) {
		 const cleanedImages = images.map((img,index) => ({
			url: process.env.REACT_APP_IMG+img?.attributes?.url,
			title: "SHADEKO-"+(index+1),
		 }));
		 setImagesClean(cleanedImages);
	  }
	}, [images]);

	

	const showArrows = imagesClean > 1;
	
	return (
	  <div>
		 {imagesClean.length > 0 && lightboxOpen && (


imagesClean.length > 1 ?
			<Lightbox 
			images={imagesClean}
			onClose={closeLightbox}	
			 />
				:
			<Lightbox 
			image={imagesClean[0].url}
			onClose={closeLightbox}	
			 />



		 )}
	  </div>
	);
 }
 
 export default Galery;
 