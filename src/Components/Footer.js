import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
library.add(faCopyright);

function Footer() {
  return (
    <div>
      <a
        style={{
          color: "#7B8A8B",
          fontSize: "0.6rem",
          fontWeight: "400",
          lineHeight: "1.5",
          textAlign: "center"
        }}
        href='https://www.freepik.com/vectors/logo'
      >
        Logo vector created by freepik - www.freepik.com
      </a>

      <span
        style={{
          color: "#7B8A8B",
          fontSize: "0.6rem",
          fontWeight: "400",
          lineHeight: "1.5"
        }}
      >
        <FontAwesomeIcon icon={faCopyright} size="1x"  /> The System 2020
      </span>
    </div>
  )
}

export default Footer;
