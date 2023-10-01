import router from "next/router";

function Opps() {
  return (
    <>
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <a href={process.env.APP_URL} className="btn btn-md btn-green">
          Go To Homepage
        </a>
      </div>
    </>
  );
}
export default Opps;
