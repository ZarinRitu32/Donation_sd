import React from "react";

const InputType = ({
  labelText,
  labelFor,
  inputType,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={labelFor}
        className="block text-gray-700 font-medium mb-1"
      >
        {labelText}
      </label>
      <input
        type={inputType}
        id={labelFor}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
      />
    </div>
  );
};

export default InputType;
