import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Dashboard/dashboard.css';

const Dashboard = () => {
  const [groceries, setGroceries] = useState([]);
  const [filterPrice, setFilterPrice] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    try {
      const response = await axios.get('http://localhost:4000/groceries');
      setGroceries(response.data.map((item) => ({ ...item, progress: 0 })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleBuyNow = async (id) => {
    // Reset the progress to 0 when "Buy Now" is clicked
    setGroceries((prevGroceries) =>
      prevGroceries.map((item) => (item.id === id ? { ...item, progress: 0 } : item))
    );

    const progress = await Swal.fire({
      icon: 'info',
      title: 'Processing Order',
      text: 'Please wait...',
      showCancelButton: true,
      showConfirmButton: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        // Simulate a delay for processing the order
        setTimeout(() => {
          // Update the progress to 50% when SweetAlert is opened
          setGroceries((prevGroceries) =>
            prevGroceries.map((item) => (item.id === id ? { ...item, progress: 50 } : item))
          );
          Swal.hideLoading();
        }, 1000);
      },
    });

    if (progress.dismiss === Swal.DismissReason.cancel) {
      setGroceries((prevGroceries) =>
        prevGroceries.map((item) => (item.id === id ? { ...item, progress: 0 } : item))
      );
    } else {
      setGroceries((prevGroceries) =>
        prevGroceries.map((item) => (item.id === id ? { ...item, progress: 100 } : item))
      );
      // Show the success message with SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Order Placed Successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleFilterChange = (event) => {
    const selectedPrice = event.target.value === 'none' ? null : parseInt(event.target.value);
    setFilterPrice(selectedPrice);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAndSortedGroceries = groceries.filter((item) => {
    if (filterPrice === null) return true;
    return item.price >= filterPrice;
  }).sort((a, b) => {
    const comparison = sortOrder === 'asc' ? 1 : -1;
    return comparison * (a.price - b.price);
  });

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
    } else {
      const results = groceries.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, groceries]);

  const displayedGroceries = searchTerm.trim() === '' ? filteredAndSortedGroceries : searchResults;

  return (
    <div>
      <h2>Groceries</h2>

      {/* Filter and Sort UI */}
      <div className='d-flex' id="serach">
        
        <label  style={{marginLeft:150}}>
          Filter by Price:
          <select value={filterPrice || 'none'} onChange={handleFilterChange} style={{padding:5}}>
            <option value="none">None</option>
            <option value="5">Above ₹5</option>
            <option value="10">Above ₹10</option>
            <option value="50">Above ₹50</option>
          </select>
        </label>
        <h3 style={{marginLeft:50}}>Search</h3>
      {/* Search Input */}

       
        <input
        
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={handleSearch}
        />
    
        <label  style={{marginLeft:50}}>
          Sort by Price:
          <select value={sortOrder} onChange={handleSortChange} style={{padding:5}}>
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>
        </label>
      </div>
      

      <div className="grocery-container" style={{marginTop:50}}>
        {displayedGroceries.map((item) => (
          <div key={item.id} className="grocery-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Price: ₹ {item.price} </p>
            <button onClick={() => handleBuyNow(item.id)}>Buy Now</button>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${item.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
