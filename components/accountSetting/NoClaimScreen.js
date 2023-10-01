import { useIntercom } from "react-use-intercom";

const NoClaimScreen = () => {
  const { show } = useIntercom();
  return (
    <div className="table-card box-shadow mt-4 mt-md-4">
      <h4>Company info</h4>
      <div className="text-center border border-top-1 pt-5 pb-5">
        <img
          src={`${process.env.APP_URL}/images/sidebar.svg`}
          className="mt-2"
        />
        <p className="fs-6 fw-medium mt-4 pt-1">
          Please claim your company page from our{" "}
          <a
            className="text-dark fw-bold text-decoration-line"
            href={`${process.env.COMPANY_DIR_URL}search`}
            target="_blank"
          >
            directory
          </a>{" "}
          or if you don’t find one, <br className="d-none d-md-block" /> you may{" "}
          <span
            className="text-dark fw-bold text-decoration-line cursor-pointer"
            onClick={() => show()}
          >
            request us
          </span>{" "}
          to create one for you
        </p>
      </div>
    </div>
  );
};

export default NoClaimScreen;
