import React from "react";

const Like = props => {
    let classes = "fa fa-heart";
    if (!props.liked) classes += "-o";
    return (
        <span>
            <i
                className={classes}
                style={{ cursor: "pointer" }}
                onClick={props.onClick}
            />
        </span>
    );
};

export default Like;
