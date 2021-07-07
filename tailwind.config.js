module.exports = {
  purge: {
    content: ["./src/**/*.vue"]
  },
  theme: {
    fontFamily: {
      body: ["Montserrat", "sans-sans"],
      sans: ["Montserrat", "sans-sans"],
      mono: [
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace"
      ]
    },
    extend: {
      spacing: {
        "2/3": "66.666%",
        "1/2": "50%"
      },
      boxShadow: {
        outline: "0 0 0 3px rgba(127, 156, 245, 0.5)"
      },
      colors: {
        primary: {
          100: "#EBF4FF",
          200: "#C3DAFE",
          300: "#A3BFFA",
          400: "#7F9CF5",
          500: "#667EEA",
          600: "#5A67D8",
          700: "#4C51BF",
          800: "#434190",
          900: "#3C366B"
        }
      },
      inset: {
        "0.5": "0.5rem",
        full: "100%"
      },
      opacity: {
        "10": "0.1",
        "90": "0.9"
      },
      h: {
        80: "20rem"
      }
    }
  },
  variants: {
    appearance: ["responsive"],
    backgroundAttachment: ["responsive"],
    backgroundColor: ["responsive", "hover", "focus"],
    backgroundPosition: ["responsive"],
    backgroundRepeat: ["responsive"],
    backgroundSize: ["responsive"],
    borderCollapse: [],
    borderColor: ["responsive", "hover", "focus"],
    borderRadius: ["responsive"],
    borderStyle: ["responsive"],
    borderWidth: ["responsive"],
    cursor: ["responsive"],
    display: ["responsive", "group-hover"],
    flexDirection: ["responsive"],
    flexWrap: ["responsive"],
    alignItems: ["responsive"],
    alignSelf: ["responsive"],
    justifyContent: ["responsive"],
    alignContent: ["responsive"],
    flex: ["responsive"],
    flexGrow: ["responsive"],
    flexShrink: ["responsive"],
    float: ["responsive"],
    fontFamily: ["responsive"],
    fontWeight: ["responsive", "hover", "focus"],
    height: ["responsive"],
    lineHeight: ["responsive"],
    listStylePosition: ["responsive"],
    listStyleType: ["responsive"],
    margin: ["responsive"],
    maxHeight: ["responsive"],
    maxWidth: ["responsive"],
    minHeight: ["responsive"],
    minWidth: ["responsive"],
    negativeMargin: ["responsive"],
    objectFit: ["responsive"],
    objectPosition: ["responsive"],
    opacity: ["responsive"],
    outline: ["focus"],
    overflow: ["responsive"],
    padding: ["responsive"],
    pointerEvents: ["responsive"],
    position: ["responsive"],
    inset: ["responsive"],
    resize: ["responsive"],
    boxShadow: ["responsive", "hover", "focus"],
    fill: [],
    stroke: [],
    tableLayout: ["responsive"],
    textAlign: ["responsive"],
    textColor: ["responsive", "hover", "focus"],
    fontSize: ["responsive"],
    fontStyle: ["responsive"],
    textTransform: ["responsive"],
    textDecoration: ["responsive", "hover", "focus"],
    fontSmoothing: ["responsive"],
    letterSpacing: ["responsive"],
    userSelect: ["responsive"],
    verticalAlign: ["responsive"],
    visibility: ["responsive", "hover", "group-hover"],
    whitespace: ["responsive"],
    wordBreak: ["responsive"],
    width: ["responsive"],
    zIndex: ["responsive"]
  },
  corePlugins: {
    container: false
  },
  plugins: []
};
