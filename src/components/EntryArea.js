import React from "react";
import TextArea from "./form/TextArea";

const EntryArea = (props) => {
    return (
        <div className="mt-3">
            <h3>Yeni Entry</h3>
            <TextArea onChange={props.onChange} />
            <button className="btn btn-primary">Paylaş</button>
        </div>
    )
}

export default EntryArea;