import React from "react";
import '../homepage/homepage.css'
const ProtectedPage = ({ name }) => {

  return (
    <div>
      <p ></p>
        <h2 id='h2'>AMUTHA STORES</h2>
        <div className="row">
<div className="col">
<img src="https://www.iga.com/hubfs/great-grocery-store.jpg#keepProtocol" alt="" id='img' height={400} width={600}></img>

</div>
<div className="col">
<h2>About Us</h2>
      <p>Welcome to our grocery store! We are dedicated to providing high-quality groceries and excellent customer service. Our goal is to make your shopping experience convenient and enjoyable.</p>
      <p>At our store, you'll find a wide selection of fresh produce, pantry staples, dairy products, meats, and more. We source our products from trusted suppliers to ensure their quality and freshness.</p>
      <p>Our friendly staff is always ready to assist you and answer any questions you may have. We strive to create a welcoming environment where you can find everything you need for your daily meals and special occasions.</p>
      <p>Thank you for choosing our grocery store. We appreciate your business and look forward to serving you!</p>
</div>
   
    </div>
      
      
    </div>
  );
};

export default ProtectedPage;