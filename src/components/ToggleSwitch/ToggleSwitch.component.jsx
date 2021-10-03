import React from "react";
import PropTypes from "prop-types";
import '../ToggleSwitch/ToggleSwitch.css';

const ToggleSwitch = ({ id, name, checked, onChange, optionLabels, small, disabled }) => {

    return (
        <div className={"toggle-switch" + (small ? " small-switch" : "")}>
            <input
                type="checkbox"
                name={name}
                className="toggle-switch-checkbox"
                id={id}
                checked={checked}
                onChange={e => onChange(e.target.checked)}
                disabled={disabled}
            />
            {id ? (
                <label className="toggle-switch-label" htmlFor={id}>
                    <span
                        className={
                            disabled
                                ? "toggle-switch-inner toggle-switch-disabled"
                                : "toggle-switch-inner"
                        }
                        data-yes={optionLabels[1]}
                        data-no={optionLabels[0]}
                    />
                    <span
                        className={
                            disabled
                                ? "toggle-switch-switch toggle-switch-disabled"
                                : "toggle-switch-switch"
                        }
                    />
                </label>
            ) : null}
        </div>
    );
}

ToggleSwitch.defaultProps = {
    optionLabels: ["Get", "Post"],
};

ToggleSwitch.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    optionLabels: PropTypes.array,
    small: PropTypes.bool,
    disabled: PropTypes.bool
};

export default ToggleSwitch;