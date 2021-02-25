import React from "react";

class Cart extends React.Component {
    constructor(props) {
        super()
        this.state = {
            cartButton: props.cartButton
        }
    }
    increment = ({target})=> {
        let id = target.dataset.id;
        let updatedCart = this.state.cartButton.map((cart) => {
            if(cart.id === Number(id)) {
                cart.qty += 1 
                cart.changedPrice = cart.qty * cart.price
            }
            return cart
        })
        this.setState({
           cartButton: updatedCart
        })
    }
    decrement = ({target})=> {
        let id = target.dataset.id;
        let updatedCart = this.state.cartButton.map((cart)=> {
            if(cart.id === +id) {
                cart.qty -=1
                cart.changedPrice = cart.qty * cart.price
            }
            return cart;
        })
        updatedCart = updatedCart.filter((data) => data.qty)
        console.log(updatedCart)
        this.setState({
            cartButton: updatedCart || []
        })
    }
    render() {

        return (
            <div className="cart-box">  
                <section>
                    <i onClick={this.props.cartHandler} className="far fa-times-circle cart-cross-btn"></i>
                    <h2><img src="/static/bag-icon.png" alt="bag-icon"/> Cart</h2>
                </section>
               <section className='products-list'>
                    <section className='scroll'>
                        {
                                this.props.cartButton.map(ele=> {
                                    return (
                                    <div className="inner-cart-box flex">
                                        <img src={`/static/products/${ele.sku}_2.jpg`} alt="product"></img>
                                        <div className="cart-product-detail">
                                            <h4>{ele.title}</h4>
                                            <span>{ele.availableSizes.map(size=> `${size},`)}</span> <span>{ele.style}</span>
                                            <p>quantity : {ele.qty}</p>
                                        </div>
                                        <div className="cart-functionality">
                                        <i onClick={this.props.removeHandler} className="fas fa-times" data-id={ele.id}></i>
                                        <h4>${ele.changedPrice}</h4>
                                        <div className="flex">
                                        <button onClick={this.increment} data-id={ele.id} className="btn">+</button>
                                        <button onClick={this.decrement} data-id={ele.id} className="btn">-</button></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </section>

                    <div className= "total-price">
                        <div className="flex">
                            <h2>Total</h2>
                            <h2>$    
                                {
                                    this.props.cartButton.reduce((acc, cv) => acc + cv.changedPrice , 0)
                                }
                            </h2>
                        </div>
                        <div className="checkout">
                            <button>Checkout</button>
                        </div>
                    </div>
               </section>
            </div>
        )
    }
}

export default Cart