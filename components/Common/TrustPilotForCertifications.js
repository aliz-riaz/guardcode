import { useRef, useEffect } from "react";

const TrustPilotForCertifications = () => {
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
      data-template-id="53aa8807dec7e10d38f59f32"
      data-businessunit-id="4be1bf0e0000640005080574"
      data-theme="light"
      data-style-height="94px"
      data-style-width="132px"
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
export default TrustPilotForCertifications;
