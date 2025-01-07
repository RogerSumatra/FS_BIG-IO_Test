import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ToolBarEditor = ({ value, onChange, readOnly = false }) => {
    const modules = {
        toolbar: !readOnly
            ? [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                [{ align: [] }],
                ["clean"],
            ]
            : false,
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "link",
        "image",
        "align",
    ];

    return (
        <div className="rich-text-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={!readOnly ? onChange : undefined}
                modules={modules}
                formats={formats}
                readOnly={readOnly}
            />
        </div>
    );
};

export default ToolBarEditor;
