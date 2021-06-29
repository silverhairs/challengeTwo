import PropTypes from "prop-types";

export default function PageBody(props) {
  return (
    <>
      {props.photos.length > 0 ? (
        <div className="container photos pt-6">
          {props.photos.map((photo, index) => {
            return (
              <div className="photo is-one-third" key={`card-${index}`}>
                <img src={photo.thumbnailUrl} alt={`photo${index}`} />
                <p className="subtitle">{photo.title}</p>
              </div>
            );
          })}
        </div>
      ) : props.status === "loading" ? (
        <div className="container loading">
          <img src="/loading.gif" height={250} alt="Loading" />
        </div>
      ) : props.status === "failure" ? (
        <div className="loading">
          <img src="/failed.png" height={250} alt="" srcset="" />
          <p className="subtitle has-text-center">Something went wrong</p>
        </div>
      ) : (
        <span></span>
      )}
    </>
  );
}

PageBody.propTypes = {
  photos: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
};
