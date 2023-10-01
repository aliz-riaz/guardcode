import { connect } from "react-redux";

import React from "react";
import Autosuggest from "react-autosuggest";
import theme from "./AutoSuggestionForJobTitle.module.scss";

// Imagine you have a list of languages that you'd like to autosuggest.
// const languages = [
//   {
//     name: 'C',
//     year: 1972
//   },
//   {
//     name: 'Elm',
//     year: 2012
//   },
// ];

// // Teach Autosuggest how to calculate suggestions for any given input value.
// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;

//   return inputLength === 0 ? [] : languages.filter(lang =>
//     lang.name.toLowerCase().slice(0, inputLength) === inputValue
//   );
// };

// // When suggestion is clicked, Autosuggest needs to populate the input
// // based on the clicked suggestion. Teach Autosuggest how to calculate the
// // input value for every given suggestion.
// const getSuggestionValue = suggestion => suggestion.name;

// // Use your imagination to render suggestions.
// const renderSuggestion = suggestion => (
//   <div>
//     {suggestion.name}
//   </div>
// );

class AutoSuggestionForJobTitle extends React.Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: this.props.jobValue,
      suggestions: [],
    };
    // this.languages = [
    //     {
    //       name: 'C',
    //       year: 1972
    //     },
    //     {
    //       name: 'Elm',
    //       year: 2012
    //     },
    //   ];
    this.languages = this.props.job_title_suggestions.map((lang) => ({
      name: lang.title,
      id: lang.id,
    }));
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.languages.filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => {
    //get job desc template
    //this.props.getJobDescTemplate(suggestion.id);
    return suggestion.name;
  };

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) => (
    <li className="text-green">{suggestion.name}</li>
  );

  renderInputComponent = (inputProps) => (
    <div className="gl-input form-group">
      <input {...inputProps} />
      <label>Job title</label>
      {this.props.errors.jobTitle && this.props.touched.jobTitle ? (
        <div className="text-danger">{this.props.errors.jobTitle}</div>
      ) : null}
    </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
    this.props.setJobTitleValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    if (value.length >= 3) {
      this.setState({
        suggestions: this.getSuggestions(value),
      });
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      value,
      onChange: this.onChange,
      className: "form-control",
      placeholder: "Job Title",
    };

    // Finally, render it!
    return (
      <div className="position-relative">
        <Autosuggest
          theme={theme}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderInputComponent={this.renderInputComponent}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // job_title_suggestions: state.vantage.jobPostReducer.jobTitleSuggestions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoSuggestionForJobTitle);
