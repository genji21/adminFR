import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [test, setTest] = useState({});

  
 const handleChange=  (e)=>{
    var reader = new FileReader();
    reader.onload = logFile
    // console.log(e.target.files[0],reader.readAsText(e.target.files[0]))
    reader.readAsText(e.target.files[0])
  }
  function logFile(event) {
    let str = event.target.result;
    let json = JSON.parse(str);
    setTest(json.infor)
  }
   const handleSubmit = (e) => {
     e.preventDefault();
     console.log(test);
     axios.post(`https://apidoanbooking.herokuapp.com/hotels/createHotel`, {
       user: { id: "61b176f6d85a0dab9e14374e" },
       infor: test,
     }).then(()=>{
       alert("Create Hotel Success Fully")
     });
   };

  return (
    <div className="productList">
      {/* <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      /> */}
      <h1>Create Hotel</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button>subbmit</button>
      </form>
    </div>
  );
}
