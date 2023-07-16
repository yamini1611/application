import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Admin Access/Admin.css';

const Admin = () => {
  const [groceries, setGroceries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 1,
    image: '',
  });
  const [editProduct, setEditProduct] = useState(null); // Store the product to be edited here

  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    try {
      const response = await axios.get('http://localhost:4000/groceries');
      setGroceries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleBuyNow = async (id) => {
    // Implement your buy now logic here
    // This is just a placeholder
    console.log('Order Placed Successfully!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) {
        // Send a PUT request to the API with the updated product data
        await axios.put(`http://localhost:4000/groceries/${editProduct.id}`, newProduct);
        // Show a success message for edit
        Swal.fire({
          icon: 'success',
          title: 'Product updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // Send a POST request to the API with the new product data
        await axios.post('http://localhost:4000/groceries', newProduct);
        // Show a success message for create
        Swal.fire({
          icon: 'success',
          title: 'Product created successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // Fetch the updated list of groceries after successful creation/edit
      await fetchGroceries();
      // Clear the form fields
      setNewProduct({
        name: '',
        price: 1,
        image: '',
      });
      // Hide the form after successful creation/edit
      setShowForm(false);
    } catch (error) {
      console.error('Error creating/updating product:', error);
      // Show an error message or handle errors as per your requirement
      Swal.fire({
        icon: 'error',
        title: 'Failed to create/update product',
        text: 'An error occurred while creating/updating the product. Please try again later.',
      });
    }
  };

  const handleAddProduct = () => {
    setShowForm(true);
    setEditProduct(null); // Reset editProduct when adding a new product
  };

  const handleEditProduct = (product) => {
    setShowForm(true);
    setEditProduct(product);
    // Set the form fields to the product data being edited
    setNewProduct({
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleDeleteProduct = async (id) => {
    try {
      // Send a DELETE request to the API to delete the product
      await axios.delete(`http://localhost:4000/groceries/${id}`);
      // Fetch the updated list of groceries after successful deletion
      await fetchGroceries();
      // Show a success message for deletion
      Swal.fire({
        icon: 'success',
        title: 'Product deleted successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      // Show an error message or handle errors as per your requirement
      Swal.fire({
        icon: 'error',
        title: 'Failed to delete product',
        text: 'An error occurred while deleting the product. Please try again later.',
      });
    }
  };

  return (
    <div>
      <h2>
        Groceries{' '}
        <button type="button" className="btn btn-dark" onClick={handleAddProduct}>
          +
        </button>
      </h2>

      <div className={`modal fade ${showForm ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: showForm ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {editProduct ? 'Edit Product' : 'Create New Product'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowForm(false)}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name:</label>
                  <input type="text" className="form-control" name="name" value={newProduct.name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price:</label>
                  <input type="number" className="form-control " min={1} name="price" value={newProduct.price} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image:</label>
                  <input type="text" className="form-control" name="image" value={newProduct.image} onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editProduct ? 'Update Product' : 'Create Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="grocery-container">
        {groceries.map((item) => (
          <div key={item.id} className="grocery-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Price: ₹ {item.price} </p>
            <div ><button className="btn btn-success" id="bn" onClick={() => handleBuyNow(item.id)}>Buy Now</button>
              <button className="btn btn-warning" id="edit" onClick={() => handleEditProduct(item)}>Edit</button>
              <button className="btn btn-danger" id="delete" onClick={() => handleDeleteProduct(item.id)}>Delete</button></div>


          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
