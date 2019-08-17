import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    const pageCount = Math.ceil(itemsCount / pageSize);

    // console.log(currentPage);

    if (pageCount === 1) return null;

    const pages = _.range(1, pageCount + 1);

    // console.log(pageSize);
    return (
        <div className="row justify-content-center">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pages.map(page => (
                        <li
                            key={page}
                            className={
                                currentPage === page
                                    ? "page-item active"
                                    : "page-item"
                            }
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
