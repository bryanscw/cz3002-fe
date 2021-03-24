import React from 'react';
import Link from '@material-ui/core/Link';
import {Typography} from "@material-ui/core";
import "./index.css";

/**
 * This component displays the footer of the web application.
 */
export default function Footer() {
  return (
      <Typography className="footer" variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/about">
          QWERTY
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}