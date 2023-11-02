import {useEffect} from 'react';
import React from 'react';
import axios from 'axios';


const useFetch = (url) =>{

	const [DATA, setDATA] = React.useState([]);
	const [error, setError] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

useEffect(()=>{




	const fetchData = async () =>{
			try{
				setLoading(true);
				const res = await axios.get(url,{
					headers: {
						Authorization: "Bearer "+process.env.REACT_APP_API_TOKEN,
					}
					
				});

				setDATA(res.data.data);
				
				

			}catch(err){
				
				setError(true)
			}
			setLoading(false);
	}
	fetchData();



},[url]);
return {data: DATA, loading, error};
} 
export default useFetch;