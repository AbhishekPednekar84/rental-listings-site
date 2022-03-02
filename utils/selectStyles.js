export const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#0D9488" : "black",
    backgroundColor: state.isSelected && "#CCFBF1",
    fontSize: "1rem",
    fontWeight: state.isSelected && 600,
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      fontSize: "1rem",
    };
  },
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
    maxHeight: "200px",
    overflow: "hidden",
  }),
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "5px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#0d9488",
    },
  }),
  container: (styles) => ({
    ...styles,
    "@media only screen and (max-width: 600px)": {
      width: "325px",
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
    height: "min-content",
  }),
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "5px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#0d9488",
    },
  }),
  input: (base) => ({
    ...base,
    "input:focus": {
      boxShadow: "none",
    },
  }),
};
