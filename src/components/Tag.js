import React from "react"
import data from "../data.json"
import Product from "./Product"
import Cart from "./Cart"

class Tag extends React.Component {
    constructor(props) {
        super()
        this.state ={
            activeCategories : "All",
            cart: false,
            cartButton: [],
        }
    }
    buttonHandler = ({target}) => {
        let id = target.dataset.id;
        let cartDataNew = data.products.find((product) => product.id ===  Number(id))
        let isInCart = this.state.cartButton.includes(cartDataNew)
        let cartData = [...this.state.cartButton];
        if(!isInCart) {
            cartData.push(cartDataNew)
        }
        cartDataNew.qty = cartDataNew.qty ? ++cartDataNew.qty : 1;
        cartDataNew.changedPrice = cartDataNew.qty * cartDataNew.price
        this.setState({
            cartButton: cartData
        })
    }

    removeHandler = ({target}) => {
        let cartData = this.state.cartButton;
        let id = target.dataset.id;
         let updatedData = cartData.filter((product) => {
             if(product.id ===  Number(id)) {
                 delete product.qty;
                 delete product.changedPrice;
             }
            return product.id !==  Number(id)
         })
         console.log(updatedData);
        this.setState({
            cartButton: updatedData
        })   
    }
    handleClick = (size) => {
        this.setState({
           activeCategories: size
        })
    }
    allHandler = ()=> {
        this.setState({
            activeCategories:"All"
        })
    }
    cartHandler = () => {
        this.setState({
            cart: !this.state.cart
        })
    }
    render() {
        let size = ["XS","S","M","L","X","XL","XXL"];
        let productData;
        if(this.state.activeCategories === "All") {
            productData = data.products.map((product)=> product);
        } else {
            productData = data.products.filter((element)=> element.availableSizes.includes(this.state.activeCategories));
            console.log(productData);
        }

        return (
            <section className="shopping-sec">
                <h1>Shopping cart</h1>
                <div className="container flex">
                    <div className="size-details">
                        <h3>Sizes:</h3>
                        <ul className="category-items flex">
                            <li onClick = {this.allHandler}>All</li>
                        {
                            size.map((categories,i)=> {
                                return (
                                    <li className={this.state.activeCategories === categories ? "active" : ""} key= {i} onClick={()=>this.handleClick(categories)}>{categories}</li>
                                )
                            } )
                        }
                        </ul>
                    </div>

                    <div className="products grid-product">
                        <Product productData={productData} buttonHandler={this.buttonHandler}/>
                    </div>

                    <div className="cart">
                        
                        {
                            this.state.cart ? <Cart removeHandler={this.removeHandler} cartHandler={this.cartHandler} cartButton={this.state.cartButton}/> : <i onClick={this.cartHandler} className="fas fa-shopping-cart bag-icon"></i>
                        }
                        <div className="bag-count"> 
                            <h2>{this.state.cartButton.length}</h2>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Tag;