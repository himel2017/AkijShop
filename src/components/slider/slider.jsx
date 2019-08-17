import React, { Component } from 'react';
import BannerImage from '../../images/banner-8.png'
class Slider extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="cauro-slider">
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={BannerImage} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={BannerImage} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={BannerImage} alt="Second slide"/>
                    </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Slider;