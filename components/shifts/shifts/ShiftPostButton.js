import Link from "next/link";

function ShiftPostButton({ text }) {
  return (
    <Link href="/shifts/post">
      <div
        className={`text-center mt-3 mt-md-4 mb-3 mb-md-4 w-md-auto w-100 ml-auto`}
      >
        <button className="btn btn-md btn-green btn-left-icon w-100 booking-button">
          <i>
            <img
              src={process.env.APP_URL + "/images/plus_icon_black.svg"}
              className="cursor-pointer"
            />
          </i>
          <span>{text}</span>
        </button>
      </div>
    </Link>
  );
}

export default ShiftPostButton;
