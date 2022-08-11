
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8000';

function Home(props) {
  const [data,setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState(false);
  function modal(){
      setShowModal(!showModal); 
  } 
  const child = (param)=> {
    if (param.length==0) {
      return <>
          <td> - </td>
          <td> - </td>
          <td> - </td>
        </>;
    } else {
      return param.map(item=>(
        <>
          <td>{item.label}</td>
          <td>{item.nb_visits}</td>
          <td>
            <button onClick={(e)=>openModal(item)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Detail
            </button>  
          </td>
        </>
      )); 
    }
  };
  
  const openModal = (param) => {
    setShowModal(showModal=true)
    setDataModal(param)
  }

	useEffect(()=>{
    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.get( 
      'api/check-token-is-active',
      config
    )
    .then(function (response) {
        if (response.data.message!='Sukses') {
          window.location = "/login";
        }
    }).catch(function (response) {
        window.location = "/login";
    });
		setData(Object.entries(props.result['datas']));
	},[]);
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Test Nuha</p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Data di ambil dari API <code>https://devel.bebasbayar.com/web/test_programmer.php</code></p>
        </div>
        <div className="container">
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Date
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Label
                        </th>
                        <th scope="col" className="py-3 px-6">
                            NB Visit
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {
                    data.map(item=>(
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item[0]}
                        </td>
                        {child(item[1])}
                      </tr>
                    ))
                  }
                </tbody>
            </table>
          </div>
          <div id="modal" style={{display: showModal?"block":"none"}}>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                  <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Detail Data</h3>
                          <div className="mt-5">
                            <ul>
                              <li><span className="font-semibold">label </span>: {JSON.stringify(dataModal.label)}</li>
                              <li><span className="font-semibold">nb_visits </span>: {JSON.stringify(dataModal.nb_visits)}</li>
                              <li><span className="font-semibold">nb_hits </span>: {JSON.stringify(dataModal.nb_hits)}</li>
                              <li><span className="font-semibold">sum_time_spent </span>: {JSON.stringify(dataModal.sum_time_spent)}</li>
                              <li><span className="font-semibold">nb_hits_with_time_generation </span>: {JSON.stringify(dataModal.nb_hits_with_time_generation)}</li>
                              <li><span className="font-semibold">min_time_generation </span>: {JSON.stringify(dataModal.min_time_generation)}</li>
                              <li><span className="font-semibold">max_time_generation </span>: {JSON.stringify(dataModal.max_time_generation)}</li>
                              <li><span className="font-semibold">sum_bandwidth </span>: {JSON.stringify(dataModal.sum_bandwidth)}</li>
                              <li><span className="font-semibold">nb_hits_with_bandwidth </span>: {JSON.stringify(dataModal.nb_hits_with_bandwidth)}</li>
                              <li><span className="font-semibold">min_bandwidth </span>: {JSON.stringify(dataModal.min_bandwidth)}</li>
                              <li><span className="font-semibold">max_bandwidth </span>: {JSON.stringify(dataModal.max_bandwidth)}</li>
                              <li><span className="font-semibold">entry_nb_visits </span>: {JSON.stringify(dataModal.entry_nb_visits)}</li>
                              <li><span className="font-semibold">entry_nb_actions </span>: {JSON.stringify(dataModal.entry_nb_actions)}</li>
                              <li><span className="font-semibold">entry_sum_visit_length </span>: {JSON.stringify(dataModal.entry_sum_visit_length)}</li>
                              <li><span className="font-semibold">entry_bounce_count </span>: {JSON.stringify(dataModal.entry_bounce_count)}</li>
                              <li><span className="font-semibold">exit_nb_visits </span>: {JSON.stringify(dataModal.exit_nb_visits)}</li>
                              <li><span className="font-semibold">sum_daily_nb_uniq_visitors </span>: {JSON.stringify(dataModal.sum_daily_nb_uniq_visitors)}</li>
                              <li><span className="font-semibold">sum_daily_entry_nb_uniq_visitors </span>: {JSON.stringify(dataModal.sum_daily_entry_nb_uniq_visitors)}</li>
                              <li><span className="font-semibold">sum_daily_exit_nb_uniq_visitors </span>: {JSON.stringify(dataModal.sum_daily_exit_nb_uniq_visitors)}</li>
                              <li><span className="font-semibold">avg_bandwidth </span>: {JSON.stringify(dataModal.avg_bandwidth)}</li>
                              <li><span className="font-semibold">avg_time_on_page </span>: {JSON.stringify(dataModal.avg_time_on_page)}</li>
                              <li><span className="font-semibold">bounce_rate </span>: {JSON.stringify(dataModal.bounce_rate)}</li>
                              <li><span className="font-semibold">exit_rate </span>: {JSON.stringify(dataModal.exit_rate)}</li>
                              <li><span className="font-semibold">avg_time_generation </span>: {JSON.stringify(dataModal.avg_time_generation)}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={modal}>Kembali</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
      
  )
}
export default Home;
export async function getServerSideProps(context) {
  // let res = await fetch("https://raw.githubusercontent.com/nuhaa/api-region/master/tester.json");
  let res = await fetch("http://localhost:8000/api/datas");
  let result = await res.json();
  // result = Object.entries(result);
  return {
    props: {
    	result
    },
  }
}