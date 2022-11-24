import React from "react";
import './Entry.css'

const Entry = (props) => {
    return (
        <div className="entry">
            <div className="entry-inside">
                {props.Entry}
            </div>
            <div className="entry-footer">
                {props.Author}
            </div>
        </div>
    )
}

export default Entry;