"use client";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { signInWithRedirect } from "aws-amplify/auth";
import { useTranslations } from "next-intl";
import { styled } from "@mui/material";
import Image from "@/components/Image";
import { usePathname } from "@/navigation";
import { useSearchParams } from "next/navigation";

const Content = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const path = redirect ? redirect : pathname;
  return (
    <>
      <BackgroundAuth>
        <Container maxWidth={"xl"}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: `calc(100vh - 64px)` }}
          >
            <>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: { xs: "none", md: "grid" }, color: "#ffffff" }}
              >
                <Image
                  src={"/EXAMBRISK_LOGO.svg"}
                  alt="exambrisk"
                  width={559}
                  height={81}
                />
                <Typography
                  variant="h2"
                  sx={{ mt: 3, fontWeight: 700, letterSpacing: "-0.78px" }}
                >
                  Service
                </Typography>
                <Box
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: 36,
                    fontStyle: "italic",
                    fontWeight: 700,
                    lineHeight: "92%",
                    letterSpacing: "-0.78px",
                  }}
                >
                  All Mock Up Future Service
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    m: "auto",
                    borderRadius: 6,
                    maxWidth: 480,
                  }}
                >
                  <Button
                    fullWidth
                    size="large"
                    color="inherit"
                    variant="outlined"
                    onClick={() =>
                      signInWithRedirect({
                        provider: "Google",
                        customState: path,
                      })
                    }
                  >
                    Google
                  </Button>
                </Card>
              </Grid>
            </>
          </Grid>
        </Container>
      </BackgroundAuth>
    </>
  );
};
export default Content;

export const BackgroundAuth = styled(`div`)`
  position: relative;
  height: 100%;
  min-height: calc(100vh - 64px);
  /* background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: linear-gradient(90deg, #003b92 0%, rgba(0, 59, 146, 0) 100%),
    url("/images/bg-login.png"); */
  background-color: #000000;
`;
