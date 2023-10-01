import { useRef, useEffect } from "react";

const TrustPilotWithReviews = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  return (
    <div
      ref={ref}
      className="trustpilot-widget"
      data-locale="en-GB"
      data-template-id="539adbd6dec7e10e686debee"
      data-businessunit-id="4be1bf0e0000640005080574"
      data-theme="light"
      data-style-height="500px"
      data-style-width="100%"
      data-stars="4,5"
      data-schema-type="Organization"
    >
      <a
        href="https://uk.trustpilot.com/review/www.get-licensed.co.uk"
        target="_blank"
        rel="noopener"
      >
        {" "}
        Trustpilot
      </a>
    </div>
  );
};
export default TrustPilotWithReviews;
