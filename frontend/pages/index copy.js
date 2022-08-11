import axios from "axios";
import { useState, useEffect } from "react";
axios.defaults.baseURL = 'http://localhost:8000';

export default function Home(props) {
  const [data,setData] = useState([]);
	useEffect(()=>{
    console.log(props);
		// setData(props.result.articles);
	},[]);
  return (
    <div>
      {
        data.map(item=>(
          <p>{item}</p>
        ))
      }
    </div>
  )
}

export async function getServerSideProps(context) {
  let res = await fetch("https://raw.githubusercontent.com/nuhaa/api-region/master/tester.json");
  let result = await res.json();
  return {
    props: {
    	result
    },
  }
}