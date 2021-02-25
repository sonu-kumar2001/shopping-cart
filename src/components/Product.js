import React from "react";

function Product (props){    
return(
           props.productData.map(detail=>{
                return (
                   <div className = "product-card" key={detail.id}>
                    <p className="shipping">{detail.isFreeShipping ? "Free Shipping" : ""}</p>
                    <img src={`/static/products/${detail.sku}_1.jpg`} alt= "product-detail"/>
                    <h3 className="product-title">{detail.title}</h3>
                    <h4 className="product-price">{detail.currencyFormat} {detail.price}</h4>
                    <button onClick={props.buttonHandler}  className="product-cart" data-id={detail.id}>Add to cart</button>
                </div>
               )
           })

)}

export default Product;