import styles from "./Button.module.css";
import PropTypes from "prop-types";
function Button({ children, type, onClick }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}{" "}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.function,
};

export default Button;
