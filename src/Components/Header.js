import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({
  selectedBatsman,
  selectedWicketkeepers,
  selectedRounders,
  selectedBowlers,
}) => {
  const selectedLength =
    selectedBatsman.length +
    selectedWicketkeepers.length +
    selectedRounders.length +
    selectedBowlers.length;
  return (
    <div className="header">
      <div>
        <Link to="/" className="header__logo">
          Pick Players
        </Link>
      </div>
      <div className="header__box">
        <div className="header__box-list">
          {selectedLength}/11 <span>Players</span>
        </div>
        <div className="header__box-list">
          0 <span>NZW</span>
        </div>
        <div className="header__box-list">
          0 <span>ENGW</span>
        </div>
        <div className="header__box-list">
        100 <span>Cr Left</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
