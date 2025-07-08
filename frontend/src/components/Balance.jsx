import PropTypes from "prop-types";

export const Balance = ({ balance }) => {
  return (
    <div className="flex gap-4">
      <div className="text-2xl font-extrabold">Your Balance</div>
      <div className="text-2xl font-semibold">${balance}</div>
    </div>
  );
};

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
};
