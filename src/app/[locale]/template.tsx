import Appbar from "@/components/layout/Appbar";
import Footer from "@/components/layout/footer";
import { Box, Stack, styled } from "@mui/material";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Appbar />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Stack>
  );
}
