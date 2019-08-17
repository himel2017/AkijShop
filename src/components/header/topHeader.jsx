import React, { Component } from 'react';
import TopHeaderImages from '../../images/32X32.png';
class TopHeader extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="topheader">
			<div className="container">
				<div className="row">
					<div className="col-lg-2 col-md-2 col-sm-2 col-12">
						<div className="top-header-social-icon">
							<ul className="list-inline">
								<li className="list-inline-item"><a href="">Follow us</a></li><li className="list-inline-item"><a href=""><i className="fab fa-facebook-f"></i></a></li>
								<li className="list-inline-item"><a href=""><i className="fab fa-twitter"></i></a></li>
								<li className="list-inline-item"><a href=""><i className="fab fa-linkedin-in"></i></a></li>
							</ul>
						</div>
					</div>
					<div className=" col-lg-7 col-md-7 col-sm-10 col-12">
						<div className="top-discount">
							<ul className="list-inline">
								<li className="list-inline-item stro">Top Discount</li>
								<li className="list-inline-item">Farm Fresh Ghee 450 ml Tin Box Market Price <strong>Tk.400</strong>  Our Discount Price<strong> Tk.360</strong></li>
							</ul>
						</div>
					</div>
					<div className=" col-lg-3 col-md-3 col-sm-12 col-12">
						<div className="top-discount">
							<ul className="list-inline">
                                <li className="list-inline-item">A sister concern of Akij Group</li>
                                <li className="list-inline-item"><a href=""><img src={TopHeaderImages} alt="akij"/></a></li>
                            </ul>
						</div>
					</div>
				</div>
			</div>
		</div>    
    );
    }
}
 
export default TopHeader;