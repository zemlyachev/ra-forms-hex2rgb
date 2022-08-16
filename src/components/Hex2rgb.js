import { useState } from "react";

function Hex2rgb(props) {
  const [state, setState] = useState({
    hex: props.hex,
    rgb: hexToRgb(props.hex),
  });

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)},` +
          `${parseInt(result[2], 16)},` +
          `${parseInt(result[3], 16)})`
      : null;
  }

  const handleHexInput = (evt) => {
    const { value } = evt.target;
    setState((oldState) => ({ ...oldState, hex: value }));
    if (value.length === 7) {
      let _rgb = hexToRgb(value);
      setState((oldState) => ({
        ...oldState,
        rgb: _rgb || "rgb(216, 87, 64)",
        isError: !_rgb,
      }));
    }
  };

  return (
    <div className="container" style={{ backgroundColor: state.rgb }}>
      <input
        className="input-hex"
        value={state.hex}
        placeholder="#xxxxxx"
        maxLength="7"
        onChange={handleHexInput}
      />

      <div className="output">{!state.isError ? state.rgb : "Ошибка!"}</div>
    </div>
  );
}

Hex2rgb.defaultProps = {
  hex:
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0"),
};

Hex2rgb.propTypes = {
  hex: function (props, propName, componentName) {
    if (!/^#[0-9A-F]{6}$/i.test(props[propName])) {
      return new Error(
        "Параметр `" +
          propName +
          "` компонента `" +
          componentName +
          "` имеет неправильное значение `" +
          props[propName] +
          "`"
      );
    }
  },
};

export default Hex2rgb;
