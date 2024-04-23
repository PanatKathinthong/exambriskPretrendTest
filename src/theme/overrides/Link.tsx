import { Link as RouterLink } from "@/navigation";
import { LinkProps } from "@mui/material/Link";
import React from "react";

const LinkBehavior = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
  const { href, ...other } = props;
  // @ts-ignore
  if (/^https?:\/\//.test(href)) return <a href={href} {...props} />;
  return <RouterLink ref={ref} href={href} {...other} />;
});
LinkBehavior.displayName = "LinkBehavior";

export default function Link() {
  return {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  };
}
