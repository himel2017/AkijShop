import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../../config.json";

class CategoryImage extends Component {
    state = {};
    render() {
        return (
            <div className="category-image text-center mt-2">
                <img
                    src={
                        config.categoryImageDirectoryUrl +
                        `/${this.props.catImage}`
                    }
                    className="product-image"
                    alt=""
                />
            </div>
        );
    }
}

export default CategoryImage;
