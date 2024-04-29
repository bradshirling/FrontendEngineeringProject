import React, { useState, ChangeEvent } from 'react'; // Import ChangeEvent type
import "../App.css"; // Import CSS file for styling

function ClientContacts() {
  const [clients, setClients] = useState([
    {
      name: 'Rupert Hugo (Appalachia Looters Inc.)',
      phoneNumber: '965-345-9922',
      address: '320 Elks Ave, Austin, Texas'
    },
    {
      name: 'John Doe (Seed Berry Farms)',
      phoneNumber: '123-456-7890',
      address: '123 Main St, New York, New York'
    },
    {
      name: 'Jane Smith (Hum Construction)',
      phoneNumber: '987-654-3210',
      address: '456 Elm St, Los Angelos, California'
    },
    // Add more client objects as needed
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortType, setSortType] = useState<string>('name');

  const [newClient, setNewClient] = useState({ name: '', phoneNumber: '', address: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (type: string) => {
    setSortType(type);
  };

  const handleAddClient = () => {
    setClients([...clients, newClient]);
    setNewClient({ name: '', phoneNumber: '', address: '' });
  };

  const handleEditClient = (index: number) => {
    setEditIndex(index);
    // Create a copy of the client object before setting it in state
    const clientToEdit = { ...clients[index] };
    setNewClient(clientToEdit);
  };
  
  // Inside the input change handlers, update the specific field of the newClient object
  <input
    type="text"
    placeholder="Name"
    value={newClient.name}
    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
  />
  
  // Inside handleSaveClient, update the specific client at editIndex
  const handleSaveClient = () => {
    if (editIndex !== null) {
      const updatedClients = [...clients];
      updatedClients[editIndex] = newClient;
      setClients(updatedClients);
      setEditIndex(null);
      setNewClient({ name: '', phoneNumber: '', address: '' });
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setNewClient({ name: '', phoneNumber: '', address: '' });
  };

  const sortedClients = [...clients].sort((a, b) => {
    if (sortType === 'name') {
      return a.name.localeCompare(b.name);
    }
    // Add more sorting options as needed
    return 0;
  });

  const filteredClients = sortedClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="client-contacts-container">
      <h2 className="heading">Client Contacts</h2>
      <div className="search-sort">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select onChange={(e) => handleSort(e.target.value)} className="sort-select">
          <option value="name">Sort by Name</option>
          {<option value="phone">Sort by Phone</option>}
          {<option value="address">Sort by Address</option>}
        </select>
      </div>
      <div className="client-cards-container">
        {filteredClients.map((client, index) => (
          <div key={index} className="client-card">
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={newClient.phoneNumber}
                  onChange={(e) => setNewClient({ ...newClient, phoneNumber: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                />
                <button onClick={handleSaveClient}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{client.name}</h3>
                <p>Phone: {client.phoneNumber}</p>
                <p>Address: {client.address}</p>
                <button onClick={() => handleEditClient(index)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <h3>Add New Client Contact</h3>
        <input
          type="text"
          placeholder="Name"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newClient.phoneNumber}
          onChange={(e) => setNewClient({ ...newClient, phoneNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newClient.address}
          onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
        />
        <button onClick={handleAddClient}>Add</button>
      </div>
    </div>
  );
}

export default ClientContacts;