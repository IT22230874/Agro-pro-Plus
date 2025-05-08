import React, { useState, useEffect } from "react";
import CardFilter from "./CardFilter";
import AssingedOrdersItem from "./AssingedOrdersItem";

const AssingedOrders = () => {
  const [items, setItems] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:8070/schedule/")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatus = (status) => {
    switch (status) {
      case "Accept":
        return "success";
        break;
      case "Warning":
        return "warning";
        break;
      case "Rejected":
        return "danger";
        break;
      default:
        return "success";
    }
  };

  return (
    <div className="card">
      <div className="card-body" >
        <h5 className="card-title">TODAY</h5>
        <div className="activity text-dark">
          <div>
            <table className="table table-bordeless datatable mb-0" style={{marginTop:"-3px"}}>
              <thead className="table-light">
                <tr>
                  <th className="col" d>
                    Target
                  </th>
                  <th className="col" d>
                    Date
                  </th>
                  <th className="col" d>
                    Action{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>20 Customers</td>
                  <td>07/09/24</td>
                  <td>
                    <span className="bg-success rounded" style={{padding: "6px 12px", color: "White"}}>Checklist</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* {items &&
          items.lenght > 0 &&
          items.map(item => (
            <AssingedOrdersItem key={item._id} item={item}/>
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default AssingedOrders;
