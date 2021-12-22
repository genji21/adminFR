import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect } from "react";
import axios from "axios";
import hotelApi from "../../api/hotelApi";
import { useState } from "react";

export default function Home() {
  const [data,setData] = useState([])
  const [test,setTest] = useState({})
  useEffect(()=>{
    const getData = async () =>{
      const data = await hotelApi.getAllHotel()
      const valueChart = data.data.data.map((item)=>{
        return {name:item.name,"thu nhap":item.thunhap}
      })
      setData(valueChart);
    }
    getData();
  },[])
  const handleChange=  (e)=>{
    var reader = new FileReader();
    reader.onload = logFile
    reader.readAsText(e.target.files[0])
  }
  function logFile(event) {
    let str = event.target.result;
    let json = JSON.parse(str);
    setTest(json.infor)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(test)
    axios.post(`https://apidoanbooking.herokuapp.com/hotels/createHotel`, {
      user:{"id": "61b176f6d85a0dab9e14374e"},
      infor: test,
    })
  }
  return (
    <div className="home">
    
      <FeaturedInfo />
      <Chart data={data} title="Hotel Income " grid dataKey="thu nhap" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
