import {
  BreadcrumbsProps as BreadcrumbsMuiProps
} from "@mui/material";

export interface BreadcrumbsProps extends BreadcrumbsMuiProps {
  items?: Array<ItemProps>;
}

export interface ItemProps {
  text?: string;
  handleChangeTo?: () => void;
  key?: string;
  href?: string;
}
