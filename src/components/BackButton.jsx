import Button from "./Button";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}
Button.propTypes = {
  children: PropTypes.node,
};

export default BackButton;
