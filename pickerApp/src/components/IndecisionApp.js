import React from "react";

import AddOption from "./AddOption";
import Options from "./Options";
import Action from "./Action";
import Header from "./Header";
import OptionModal from "./OptionModal";

class IndecisionApp extends React.Component {
  state = {
    selectedOption: undefined,
    options: [],
  };

  handlePick = () => {
    const opt = this.state.options[
      Math.floor(Math.random() * this.state.options.length)
    ];
    this.setState(() => ({
      selectedOption: opt,
    }));
  };

  clearSelectedOption = () => {
    this.setState(() => ({
      selectedOption: undefined,
    }));
  };

  handleAddOption = (option) => {
    if (!option) {
      return "Enter valid value";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    } else {
      this.setState((oldState) => ({
        options: [...oldState.options, option],
      }));
    }
  };

  handleDeleteOptionSingular = (optionToRemove) => {
    this.setState((oldState) => ({
      options: oldState.options.filter((option) => optionToRemove !== option),
    }));
  };

  handleDeleteOptions = () => {
    this.setState(() => ({
      options: [],
    }));
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (err) {
      console.log("Error in mounting options");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  render() {
    const title = "Indecision";
    const subtitle = "Use Computer what do?";
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            options={this.state.options}
            hasOptions={Boolean(this.state.options.length)}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOptionSingular={this.handleDeleteOptionSingular}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          clearSelectedOption={this.clearSelectedOption}
          selectedOption={this.state.selectedOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: [],
};

export default IndecisionApp;
