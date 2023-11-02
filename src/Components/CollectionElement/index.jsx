import React from 'react';
import {Link} from 'react-router-dom';

function CollectionElement({el}) {

	const [skeletonState, setSkeletonState] = React.useState(true);


	return (
		<Link to={'/collection/'+el.attributes.type.toLowerCase()+'/'+el.attributes.url}>
			<div className="collectionElement__wr">

				<div className={skeletonState ? "skeleton-load-img active" : "skeleton-load-img"}></div>

				<img 
				src={process.env.REACT_APP_IMG + el?.attributes?.img?.data?.attributes?.url}
				alt="main"
				onLoad={ () => setSkeletonState(false) }
				 />
				 <h6>{el?.attributes.name}</h6>
			</div>
		</Link>
	);
}

export default CollectionElement;