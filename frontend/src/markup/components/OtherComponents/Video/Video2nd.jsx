import tire from "../../../../assets/images/custom/tire.png";

function Video2nd() {
  return (
    <section className="video-section">
      <div
        data-parallax='{"y": 50}'
        className="sec-bg"
        style={{ backgroundImage: `url(${tire})` }}
      ></div>
      <div className="auto-container">
        <h5>Working since 2015</h5>
        <h2>
          We are leader <br /> in Car Mechanical Work
        </h2>
        <div className="video-box">
          <div className="video-btn">
            <a
              href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
              className="overlay-link lightbox-image video-fancybox ripple"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="flaticon-play"></i>
            </a>
          </div>
          <div className="text">
            Watch intro video <br /> about us
          </div>
        </div>
      </div>
    </section>
  );
}

export default Video2nd;
