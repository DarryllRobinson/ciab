import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
library.add(faCopyright);

function Footer() {
  return (
    <div
      style={{
        color: "#7B8A8B",
        fontSize: "0.6rem",
        fontWeight: "400",
        lineHeight: "1.5",
        position: "absolute",
        left: "0",
        bottom: "0",
        right: "0",
        textAlign: "center"
      }}
    >
      <FontAwesomeIcon icon={faCopyright} size="1x"  />
        Copyright 2020 thesystem.co.za. All rights reserved. Various trademarks held by their respective owners.
        The System. South Africa & Australia
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a
        style={{
          color: "#7B8A8B",
        }}
        href='https://www.freepik.com/vectors/logo'
      >
        Logo vector created by freepik - www.freepik.com
      </a>



    </div>
  )
}

export default Footer;
