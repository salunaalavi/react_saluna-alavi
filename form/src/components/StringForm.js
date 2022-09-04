import { useState } from "react";
import useComponentVisible from "../hooks/useComponentVisible";
import "./StringForm.css";

function StringForm({ formType }) {
  const [value, setValue] = useState("");
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  return (
      <label ref={ref}>
        {!isComponentVisible && (
          <span>
            <label
              className={`${
                isComponentVisible === true ? "form-clicked" : ""
              } form-label`}
            >
              {formType}
            </label>
            <input
              type="text"
              placeholder={formType}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onClick={() => setIsComponentVisible(true)}
            />
          </span>
        )}{" "}
        {isComponentVisible && (
          <span>
            <input
              type="text"
              placeholder={formType}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </span>
        )}
      </label>
  );
}

export default StringForm;
