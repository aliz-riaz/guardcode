import Link from "next/link";
const TitleList = ({ titles }) => {
  return (
    <>
      {titles?.length > 0 ? (
        titles?.map((data) => {
          return (
            <li className="fw-bold d-flex align-items-center justify-content-center">
              <Link
                href={`${process.env.APP_URL}/job-description/${data.slug}`}
              >
                <a className="d-flex align-items-center justify-content-center">
                  {data.title}
                </a>
              </Link>
            </li>
          );
        })
      ) : (
        <>
          <p className="text-center">No data found!</p>
        </>
      )}
    </>
  );
};

export default TitleList;
