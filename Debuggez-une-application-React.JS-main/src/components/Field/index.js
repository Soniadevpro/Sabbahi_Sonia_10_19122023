import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
  // première solution était de rajouter ici le mail en 3 (finalement choisi ajout de prop)
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, fieldMail }) => {
  // ajout de prop pour le champ du mail
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = <input type={fieldMail} required name={name} placeholder={placeholder} data-testid="field-testid" />;
      break;
    case FIELD_TYPES.TEXTAREA:
      component = <textarea name={name} required data-testid="field-testid" placeholder={placeholder} />;
      break;
    default:
      component = (
        <input
          type="text"
          required // rajout de required
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  fieldMail: PropTypes.string, // rajout de la prop verif type
};
Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
  fieldMail: "", // rajout prop par default
};

export default Field;
