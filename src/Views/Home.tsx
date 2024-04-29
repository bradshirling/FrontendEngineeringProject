import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { ClientTableRow, ClientTableJsonObject } from "../DataObjects/ClientTableInterface";
import { INIT_RESULT_DATA } from "../DataConstants/ClientTableConstants";

export default function Main() {
  const [tableData, setTableData] = useState<ClientTableRow[]>([INIT_RESULT_DATA]);
  const [modalClientData, setModalClientData] = useState<ClientTableRow>(INIT_RESULT_DATA);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newClient, setNewClient] = useState<ClientTableJsonObject>({
    id: 0,
    client_name: "",
    state: "",
    num_of_inventories: 0,
    num_of_contacts: 0
  });

  useEffect(() => {
    setClientTable();
  }, []);

  function setClientTable() {
    try {
      const mockClientData: ClientTableJsonObject[] = [
        { id: 1, client_name: "Hum Construction", state: "California", num_of_inventories: 1, num_of_contacts: 1 },
        { id: 2, client_name: "Seed Berry Farms", state: "New York", num_of_inventories: 1, num_of_contacts: 1 },
        { id: 3, client_name: "Appalachia Looters Inc.", state: "Texas", num_of_inventories: 1, num_of_contacts: 1 }
      ];
  
      let clientTableArray: ClientTableRow[] = [];
      mockClientData.forEach((element: ClientTableJsonObject) => {
        clientTableArray.push({
          id: element.id || null,
          ClientName: element.client_name || "",
          AddressState: element.state || "",
          InventoryCount: element.num_of_inventories || null,
          ContactCount: element.num_of_contacts || null
        });
      });
      setTableData(clientTableArray);
    } catch (error) {
      console.error(error);
    }
  }

  function toggleModal() {
    setIsModalActive(!isModalActive);
  }

  function showModal(key: number) {
    const clientRow: ClientTableRow = tableData[key];
    setModalClientData(clientRow);
    toggleModal();
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function handleEditClientName(event: React.ChangeEvent<HTMLInputElement>, key: number) {
    const newData = [...tableData];
    newData[key].ClientName = event.target.value;
    setTableData(newData);
  }

  function handleEditState(event: React.ChangeEvent<HTMLInputElement>, key: number) {
    const newData = [...tableData];
    newData[key].AddressState = event.target.value;
    setTableData(newData);
  }

  function filterTableData() {
    return tableData.filter((row) =>
      row.ClientName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  function handleNewClientChange(event: React.ChangeEvent<HTMLInputElement>, field: string) {
    setNewClient({
      ...newClient,
      [field]: event.target.value
    });
  }

  function addClient() {
    setTableData([...tableData, {
      id: tableData.length + 1,
      ClientName: newClient.client_name,
      AddressState: newClient.state,
      InventoryCount: newClient.num_of_inventories,
      ContactCount: newClient.num_of_contacts
    }]);
    setNewClient({
      id: 0,
      client_name: "",
      state: "",
      num_of_inventories: 0,
      num_of_contacts: 0
    });
  }

  return (
    <>
      <h2 className="title is-2 has-text-centered pb-6 has-text-weight-medium">Client List</h2>
      <div className="container">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search by client name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="input mb-3"
          />
          <button className="button is-success ml-3" onClick={addClient}>Add Client</button>
        </div>
        <table className="table is-bordered is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Client Name</th>
              <th>State</th>
              <th>Number of Inventories</th>
              <th>Number of Contacts</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterTableData().map((row, i) => (
              <tr key={i}>
                <td>{String(row.id)}</td>
                <td>
                  <input
                    type="text"
                    value={String(row.ClientName)}
                    onChange={(e) => handleEditClientName(e, i)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={String(row.AddressState)}
                    onChange={(e) => handleEditState(e, i)}
                  />
                </td>
                <td>
                  <Link to={`/clientinventories`}>
                    <button className="button is-link is-small mr-1">
                      {String(row.InventoryCount)}
                    </button>
                  </Link>
                </td>
                <td>
                  <Link to={`/clientcontacts`}>
                    <button className="button is-link is-small mr-1">
                      {String(row.ContactCount)}
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className="button is-info is-small mr-1"
                    onClick={() => showModal(i)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalActive && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <h3 className="title is-3">{modalClientData.ClientName}</h3>
              <p><strong>State:</strong> {modalClientData.AddressState}</p>
              <p><strong>Number of Inventories:</strong> {modalClientData.InventoryCount.toString()}</p>
              <p><strong>Number of Contacts:</strong> {modalClientData.ContactCount.toString()}</p>
              <button className="button is-info mt-3" onClick={toggleModal}>Close</button>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
        </div>
      )}
    </>
  );
}