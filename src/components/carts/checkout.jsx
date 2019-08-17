import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import hand from '../../images/hand.png';
import givemoney from '../../images/give-money.png';
import cartService from '../../services/cartService';
import delivaryImage from '../../images/001-delivery-truck.png';

class Checkout extends Component {
    state = { 
      shipping_cost: 50,
      carts: [],
      user: {},
      orderSuccess: false,
      message: '',
      orderNo: 0
   }

   constructor(props) {
      super(props);
      // create a ref to store the textInput DOM element
      this.name = React.createRef();
      this.email = React.createRef();
      this.phone_no = React.createRef();
      this.shipping_address = React.createRef();
    }
   
   async componentDidMount() {
      const carts = await cartService.getCartItems();
      this.setState({ carts: carts.data });

      if(carts.data.length === 0){
         window.location = "/carts";
      }

  }


	totalCartAmount() {
		let totalAmount = 0;
		this.state.carts.map(
			cart => (totalAmount += cart.product_quantity * cart.product.price)
		);
		return totalAmount;
	}
	
	totalCartItems() {
		let totalItems = 0;
        this.state.carts.map(
            cart => (totalItems += cart.product_quantity)
        );
        return totalItems;
   }
   
   handleSubmit = async e => {
      e.preventDefault();
      const name = this.name.current.value;
      const email = this.name.current.email;
      const phone_no = this.phone_no.current.value;
      const shipping_address = this.shipping_address.current.value;
      const hasOrder = await cartService.checkout(name, email, phone_no, shipping_address);
      if(hasOrder.status){
         this.setState({orderSuccess: true, orderNo: hasOrder.data.order.id});
      }
   }

    render() { 
        return ( 
        <div className="confirm-tabs">
           {
              !this.state.orderSuccess && 
            <div className="container">
            <div className="row">
               <div className="col-md-8">
                  <div className="confirm-tabs-info">
                     
                     <div className="tabs-wrap tab-pane">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                           <li role="presentation" className=" nav-item">
                              <a href="#billing" className="nav-link" aria-controls="billing" role="tab" data-toggle="tab" aria-expanded="true"> Delivery Address & Payment Method</a>
                           </li>
                        
                           
                        </ul>
                        <div className="tab-content">
                           <div role="tabpanel" className="tab-pane active" id="billing">
                              
                              <form className="form-padding confirmform" onSubmit={this.handleSubmit}>
                                 <div className="form-group">
                                    <label for="exampleInputEmail1">Name <span className="validat">*</span></label>
                                    <input type="text" className="form-control" 
                                    name="name" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter your name"
                                    ref={this.name} 
                                    required
                                    />
                                 </div>
                                 <div className="form-group">
                                    <label for="exampleInputEmail1">Email <span className="validat">*</span></label>
                                    <input type="email"
                                    ref={this.email} 
                                     className="form-control"
                                      required
                                      name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email"/>
                                 </div>
                                 <div className="form-group">
                                    <label for="exampleInputPassword1">Phone number<span className="validat">*</span></label>
                                    <input type="text" 
                                    ref={this.phone_no} 
                                     className="form-control" required id="exampleInputPassword1" placeholder="Entetr Phone Number"/>
                                 </div>
                                 <div className="form-group">
                                    <label for="address">Your Shipping address<span className="validat">*</span></label>
                                    <textarea className="form-control" required ref={this.shipping_address}  id="address" placeholder="Enter Address"></textarea>
                                 </div>

                                 {/* <div className="form-group">
                                    <label for="exampleInputPassword1">District<span className="validat">*</span></label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                 </div> */}

                                 <h6>Select Payment method</h6>

                                 <div className="row justify-content-center">
                                  
                                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                                       <div className="paymentcash">
                                          <label className="pay-method visa">
                                          <span>For cash payment plese select Online Card</span>
                                          <img src={hand} alt=""/>
                                          <input type="checkbox" id="Check2" value="Value1" onclick="selectOnlyThis(this.id)" />
                                          <span>Cash on delivery</span>
                                         
                                       </label>
                                       </div>
                                     
                                    </div>

                                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                                       <div className="paymentcash">
                                          <label className="pay-method visa">
                                          <span>For cash payment plese select Online Card</span>
                                          <img src={givemoney}alt=""/>
                                          <input type="checkbox" id="Check2" value="Value1" onclick="selectOnlyThis(this.id)" />
                                          <span>Cash on delivery</span>
                                         
                                       </label>
                                       </div>
                                     
                                    </div>

                                    <div className="confirmBtn">
                                       <Link to="/">
                                          <button type="submit" className="btn btn-danger float-left ml-3">
                                             Continue Shopping
                                          </button>
                                       </Link>
                                       <button type="submit"  className="btn btn-outline-info float-right">
                                             <i className="fa fa-check"></i>  Confirm Order
                                       </button>
                                    </div>
                                 </div>
                                 
                              </form>
                               
                           </div> 
                        </div>
                           
                     </div>
                     <div id="push"></div>
                     
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="order-summery">
                     <div className="card-header">
                        <p><i className="fas fa-shopping-bag"></i>Order summery</p>
                     </div>
                     <div className="card">
                        <div className="card-body adtocard">
                          
                           <div className="total-amounts">
                              <span className="toamount">Total Amount</span>
                              <span className="toamtk"><span>&#2547;</span> {this.totalCartAmount()} </span>
                           </div>
                           <div className="total-amount">
                              <span className="delch">Delivery Charge</span>
                              <span className="toamtk"><span>&#2547;</span> {this.state.shipping_cost}</span>
                           </div>
                           <hr/>
                           <div className="subtotal">
                              <span className="subt">Total Amount</span>
                              <span className="subtk"><span>&#2547;</span> 
                              {this.totalCartAmount() +
                              this.state
                                 .shipping_cost}
                                 </span>

                                
                           </div>
                           <br/>
                           <div className="float-right">
                              <Link to="/carts" className="text-danger">
                                    <i className="fa fa-edit"></i> Change Cart Items
                              </Link>  
                           </div>
                           <div className="clearf"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      
           }
           {
              this.state.orderSuccess && 
              <div className="container mt-5 mb-5">
                 <div className="delivery-header">
                  <img src={delivaryImage} alt="" />
                  <div className="header-info">
                     <p>Your order has been Successfully !!</p>
                     <span>Order Number is</span>
                     <span className="delno">{this.state.orderNo}</span>
                  </div>
               </div>
              </div>
           }
         
      </div>
         );
    }
}
 
export default Checkout;