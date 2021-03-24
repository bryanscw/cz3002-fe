import React from 'react';
import {Link} from 'react-router-dom';
import {Typography} from "@material-ui/core";
import "./index.css";

/**
 * This component displays the footer of the web application.
 */
export default function Footer() {
  return (
      <Typography className="footer" variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          QWERTY
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}