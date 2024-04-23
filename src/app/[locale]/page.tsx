import { Button, Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Content from "./content";

export default function Home() {
  const t = useTranslations();
  return (
    <main>
      <Container>
        <Typography variant="h4">{t("Index.title")}</Typography>
        <Content />
      </Container>
    </main>
  );
}
