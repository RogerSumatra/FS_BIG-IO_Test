import React from "react";
import ReactQuill from "react-quill"; // Import Quill
import "react-quill/dist/quill.snow.css"; // Quill default styles

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
            : false, // Disable toolbar when in read-only mode
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
                onChange={!readOnly ? onChange : undefined} // Disable onChange when readOnly
                modules={modules}
                formats={formats}
                readOnly={readOnly} // Set readOnly mode
            />
        </div>
    );
};

export default ToolBarEditor;
