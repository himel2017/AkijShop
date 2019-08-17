import React, { Component } from "react";
import { Link } from "react-router-dom";
class SliderMenu extends Component {
    state = {
        active: false
    };

    handleMenuClick = id => {
        this.setState({ active: false });
    };

    render() {
        return (
            <div className="slider-menu">
                <div className="slider-menu-hori">
                    <ul>
                        <li
                            className={
                                this.state.active
                                    ? "sub-menu-parent active"
                                    : "sub-menu-parent "
                            }
                            tab-index="0"
                        >
                            <Link to={`/categories/${this.props.catId}`}>
                                {this.props.CatMenuName.toUpperCase()}
                            </Link>
                            {/* <Link to={this.props.catId}><i className="fas fa-arrow-right dt"></i></Link> */}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SliderMenu;
