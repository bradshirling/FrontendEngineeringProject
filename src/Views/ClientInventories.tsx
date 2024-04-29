import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../App.css'; // Import CSS file for styling

function ClientInventories() {
    const [name, setName] = useState('');
    const [storageType, setStorageType] = useState('');
    const [maxItemCapacity, setMaxItemCapacity] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [clientInventories, setClientInventories] = useState([
        { id: 1, name: 'Hum Construction Inventory 1', storageType: 'Warehouse', maxItemCapacity: 100 },
        { id: 2, name: 'Seed Berry Farms Inventory 1', storageType: 'Storefront', maxItemCapacity: 50 },
        { id: 3, name: 'Appalachia Looters Inc. Inventory 1', storageType: 'Barg', maxItemCapacity: 75 }
    ]);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleStorageTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setStorageType(event.target.value);
    };

    const handleMaxItemCapacityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMaxItemCapacity(event.target.value);
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name.trim()) return;
    
        const inventoryToUpdate = clientInventories.find(inv => inv.name.trim() === name.trim());
        if (inventoryToUpdate) {
            const updatedInventories = clientInventories.map(inv => {
                if (inv.id === inventoryToUpdate.id) {
                    return { ...inv, storageType, maxItemCapacity: parseInt(maxItemCapacity) };
                }
                return inv;
            });
            setClientInventories(updatedInventories);
        } else {
            const newInventory = {
                id: Date.now(),
                name,
                storageType,
                maxItemCapacity: parseInt(maxItemCapacity)
            };
            setClientInventories([...clientInventories, newInventory]);
        }
        setName('');
        setStorageType('');
        setMaxItemCapacity('');
    };

    const handleEdit = (inventory: { id: number, name: string, storageType: string, maxItemCapacity: number }) => {
        setName(inventory.name);
        setStorageType(inventory.storageType);
        setMaxItemCapacity(String(inventory.maxItemCapacity));
    };

    const filteredInventories = clientInventories.filter(
        inventory => inventory.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="client-inventories-container">
            <h2>Add/Edit Inventory</h2>
            <form onSubmit={handleSubmit} className="inventory-form">
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} className="form-input" />
                </label>
                <br />
                <label>
                    Storage Type:
                    <select value={storageType} onChange={handleStorageTypeChange} className="form-input">
                        <option value="">Select Storage Type</option>
                        <option value="Warehouse">Warehouse</option>
                        <option value="Storefront">Storefront</option>
                        <option value="Barg">Barg</option>
                    </select>
                </label>
                <br />
                <label>
                    Max Item Capacity:
                    <input type="number" value={maxItemCapacity} onChange={handleMaxItemCapacityChange} className="form-input" />
                </label>
                <br />
                <button type="submit" className="form-button">{name ? 'Update' : 'Add'}</button>
            </form>

            <h2>Search Inventory</h2>
            <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearch} className="search-input" />

            <h2>Example Client Inventories:</h2>
            <ul className="inventory-list">
                {filteredInventories.map(inventory => (
                    <li key={inventory.id} className="inventory-item">
                        <span>Name: {inventory.name},</span>
                        <p>
                        </p>
                        <span> Storage Type: {inventory.storageType},</span>
                        <p>
                        </p>
                        <span> Max Item Capacity: {inventory.maxItemCapacity}</span>
                        <p>
                        </p>
                        <button onClick={() => handleEdit(inventory)} className="edit-button">Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientInventories;