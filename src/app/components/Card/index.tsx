"use client";

import { Card, CardContent } from "@mui/material";

export default function CardComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card sx={{ padding: "20px", marginTop: "30px", width: '100%' }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
