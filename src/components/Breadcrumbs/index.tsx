"use client";

import { Link, Typography } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { NavigateNext } from "@mui/icons-material";
import { BreadcrumbsProps, ItemProps } from "./type";
import { styled } from "@mui/material/styles";

/**
 *
 * @param {array} items {text:"",handleChangeTo:func}
 *
 */

const Breadcrumb: React.FC<BreadcrumbsProps> = ({ children }) => {
  return (
    <MuiBreadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
    >
      {children}
    </MuiBreadcrumbs>
  );
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <>
      <Breadcrumb>
        {items &&
          items.map((e: ItemProps, i: number) =>
            e?.handleChangeTo || e?.href ? (
              <Link
                key={i}
                id={`breadcrumbs-link-${i}`}
                href={e?.href || "#"}
                onClick={() => {
                  e?.handleChangeTo && e.handleChangeTo();
                }}
                variant="body2"
              >
                {e.text}
              </Link>
            ) : (
              <Typography
                key={i}
                id={`breadcrumbs-link-${i}`}
                variant="body2"
                color="text.secondary"
              >
                {e.text}
              </Typography>
            )
          )}
      </Breadcrumb>
    </>
  );
};

export default Breadcrumbs;
