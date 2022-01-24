export const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#0D9488" : "black",
    backgroundColor: state.isSelected && "#CCFBF1",
    fontWeight: state.isSelected && 600,
  }),
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? 0 : 0,
    // This line disable the blue border
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      border: state.isFocused ? 0 : 0,
    },
  }),
  menu: (base) => ({
    ...base,
    maxHeight: "250px",
    overflowY: "scroll",
  }),
  container: (styles) => ({
    ...styles,
    "@media only screen and (max-width: 600px)": {
      width: "350px",
    },
    "@media only screen and (min-width: 601px)": {
      width: "525px",
    },
    "@media only screen and (min-width: 992px)": {
      width: "600px",
    },
  }),
  input: (base) => ({
    ...base,
    "input:focus": {
      boxShadow: "none",
    },
  }),
};

export const listingSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#0D9488" : "black",
    backgroundColor: state.isSelected && "#CCFBF1",
    fontWeight: state.isSelected && 600,
  }),
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? 0 : 0,
    // This line disable the blue border
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      border: state.isFocused ? 0 : 0,
    },
  }),
  menu: (base) => ({
    ...base,
    maxHeight: "250px",
    overflowY: "scroll",
  }),
  input: (base) => ({
    ...base,
    "input:focus": {
      boxShadow: "none",
    },
  }),
};
