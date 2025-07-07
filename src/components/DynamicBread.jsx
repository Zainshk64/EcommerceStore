import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function DynamicBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="py-10">
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Home
        </Link>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography color="text.primary" key={to}>
              {capitalize(decodeURIComponent(value))}
            </Typography>
          ) : (
            <Link
              component={RouterLink}
              to={to}
              key={to}
              underline="hover"
              color="inherit"
            >
              {capitalize(decodeURIComponent(value))}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
