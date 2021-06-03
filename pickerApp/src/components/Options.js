import React from "react";
import Option from "./Option";

const Options = (props) => (
  <div>
    <div className="widget--header">
      <h3 className="widget--header__title">Your Options</h3>
      <button
        className="button button--link"
        onClick={props.handleDeleteOptions}
      >
        Remove all options
      </button>
    </div>
    {!props.options.length && (
      <p className="widget--message">Please add an option to get started</p>
    )}
    {props.options.map((opt, i) => (
      <Option
        key={i}
        index={i + 1}
        optionText={opt}
        handleDeleteOptionSingular={props.handleDeleteOptionSingular}
      />
    ))}
  </div>
);

export default Options;
