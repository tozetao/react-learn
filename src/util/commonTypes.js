import PropTypes from "prop-types";

const option = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
})

export default {
  option,
  options: PropTypes.arrayOf(option)
}