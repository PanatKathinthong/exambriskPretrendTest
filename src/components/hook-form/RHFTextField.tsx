// form
import {
  useFormContext,
  Controller,
  FieldValues,
  Control,
  Path,
  ControllerProps,
} from "react-hook-form";
// @mui
import { TextField, TextFieldProps } from "@mui/material";

// ----------------------------------------------------------------------

type IProps<N extends FieldValues> = {
  name: keyof N;
  defaultValue?: any;
  control?: Control<N, any>;
} & Omit<ControllerProps, "render" | "control" | "name">;

export type RHFTextFieldProps<T extends FieldValues> = IProps<T> &
  Omit<TextFieldProps, "name">;

export default function RHFTextField<T extends FieldValues>({
  name,
  rules,
  defaultValue,
  control,
  variant = "outlined",
  ...other
}: RHFTextFieldProps<T>) {
  const { control: controlChildren } = useFormContext<T>();

  return (
    <Controller
      name={name as Path<T>}
      control={(control as any) ?? controlChildren}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
