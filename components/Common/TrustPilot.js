import { useRef, useEffect } from "react";

const TrustBox = () => {
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
      data-template-id="5406e65db0d04a09e042d5fc"
      data-businessunit-id="4be1bf0e0000640005080574"
      data-style-height="28px"
      data-style-width="100%"
      data-theme="light"
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
export default TrustBox;
