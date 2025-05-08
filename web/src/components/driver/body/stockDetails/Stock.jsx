import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import { BlobProvider } from "@react-pdf/renderer";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import StockForm from "./StockForm";
import StockReport from "./StockReport";
import "./Stock.css";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";
import useGeoLocation from "../../Components/map/useGeoLocation"; // Import the useGeoLocation hook

axios.defaults.baseURL = "http://localhost:8070/";

function Stock() { // Changed 'stock' to 'Stock'
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedstock, setSelectedstock] = useState(null);
  const [filter, setFilter] = useState('Today');

  const [filteredDataList, setFilteredDataList] = useState([]);
  const location = useGeoLocation(); // Use the custom hook to get current location

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList);
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Stock/");
      setDataList(response.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSearch = (query) => {
    const filteredList = dataList.filter((stock) => {
      const searchFields = [
        "business_name",
        "ferti_name",
        "amount",
        "price",
        "description",
        "availability"
      ];
      return searchFields.some((field) => {
        const fieldValue = stock[field];
        if (typeof fieldValue === "string") {
          return fieldValue.toLowerCase().includes(query.toLowerCase());
        }
        return String(fieldValue).toLowerCase().includes(query.toLowerCase());
      });
    });
    setFilteredDataList(filteredList);
  };

  const handleRefreshClick = () => {
    getFetchData();
  };

  const generateExcelFile = () => {
    const ws = XLSX.utils.json_to_sheet(dataList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stock Report");
    writeFile(wb, "Stock_report.xlsx");
  };

  const handleButtonClick = () => {
    getFetchData();
    generateExcelFile();
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (stock) => {
    setSelectedstock(stock);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Stock/delete/${id}`);
      toast.error("Successfully Deleted");
      getFetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      // Prepare the data to send, including actual location
      const newStockData = { 
        ...formData, 
        location: { 
          lat: location.coordinates?.lat || 'N/A', 
          lng: location.coordinates?.lng || 'N/A' 
        } 
      };
  
      // Post the new data
      await axios.post("/Stock/add", newStockData);
      toast.success("Stock Details Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };
  
  const handleEditSubmit = async (formData) => {
    try {
      // Append the location to the form data for updating
      const updatedStockData = { 
        ...formData, 
        location: { 
          lat: location.coordinates?.lat || 'N/A', 
          lng: location.coordinates?.lng || 'N/A' 
        } 
      };
  
      // Send the updated data
      await axios.patch(`/Stock/update/${formData._id}`, updatedStockData);
      toast.success("Stock Details Updated");
      handleEditModalClose();
      getFetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };
  

  const [showReportModal, setShowReportModal] = useState(false);

  const handleCloseReportModal = () => setShowReportModal(false);
  const handleShowReportModal = () => setShowReportModal(true);

  return (
    <div className="main">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="card-title">
                Stock Details<span>| {filter}</span>
                <h6>Manage stock</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <BlobProvider
                  document={<StockReport dataList={dataList} />}
                  fileName="Stock_Report.pdf"
                >
                  {({ url, blob }) => (
                    <div className="button-container">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={Pdf} alt="Pdf Icon" className="icon" />
                      </a>
                    </div>
                  )}
                </BlobProvider>
              </li>
              <li>
                <div className="button-container">
                  <a onClick={handleButtonClick}>
                    <img src={Excel} alt="Excel Icon" className="icon" />
                  </a>
                </div>
              </li>
              <li>
                <div className="button-container">
                  <a href="#" onClick={handleRefreshClick}>
                    <img src={Refresh} alt="Refresh Icon" className="icon" />
                  </a>
                </div>
              </li>
            </ul>
            <div className="page-btn">
              <button
                type="button"
                className="btn btn-added"
                onClick={handleAddModalOpen}
              >
                <i className="bi bi-plus-circle"></i> Add Stock {/* Changed from <stock></stock> to Add Stock */}
              </button>
            </div>
          </div>

          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <StockForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <StockForm
                handleSubmit={handleEditSubmit}
                initialData={selectedstock}
              />
            </Modal.Body>
          </Modal>

          <div className="table-container">
            <SearchBar onSearch={handleSearch} />
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">Business Name </th>
                  <th scope="col">Fertilizer Type</th>
                  <th scope="col">Stock Amount</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Availability Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDataList.length ? (
                  filteredDataList.map((stock) => (
                    <tr key={stock._id}>
                      <td>{stock.business_name}</td>
                      <td>{stock.ferti_name}</td>
                      <td>{stock.amount}</td>
                      <td>{stock.price}</td>
                      <td>{stock.description}</td>
                      <td>{stock.availability}</td>
                      <td className="action">
                        <div className="buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(stock)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(stock._id)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Stock; // Changed 'stock' to 'Stock'
