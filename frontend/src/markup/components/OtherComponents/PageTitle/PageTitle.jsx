import React from "react";
import tire from "../../../../assets/images/custom/tire.png";

function PageTitle({ title, pageName }) {
  return (
    <section
      className="video-section sec-bg"
      data-parallax='{"y": 50}'
      style={{ backgroundImage: `url(${tire})` }}
    >
      <div className="auto-container">
        <h2>{title}</h2>
        <ul className="page-breadcrumb">
          <li>
            <a href="/">home</a>
          </li>
          <li>{pageName}</li>
        </ul>
      </div>
    </section>
  );
}

export default PageTitle;
