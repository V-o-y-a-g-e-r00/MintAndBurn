import * as React from "react";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";

export default function BoldVariant() {
  return (
    <Button
      //color="warning" didn't work with custom variant
      //classes used sx instead
      //component="span"
      //disabled={false}
      //fullWidth={false}
      size="medium"
      startIcon={<Icon>star</Icon>}
      sx={{ mt: 2, ml: 2 }}
      variant="bold"
      href="smartdevpreneur.com"
    >
      Custom Variant
    </Button>
  );
}
