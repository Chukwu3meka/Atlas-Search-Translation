import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { fetcher } from "@utils/clientFuncs";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { HomeOutlined } from "@mui/icons-material";

const FinalizeSignup = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const verifyMail = async () => {
    try {
      const { verification, ref } = router.query;

      await fetcher("/auth/verifyMail", { verification, ref });

      enqueueSnackbar("Account verification successfull", { variant: "info" });
    } catch (error) {
      enqueueSnackbar(error.message || error || "Account verification Failed", { variant: "error" });
    }
  };

  useEffect(() => {
    if (router.isReady) verifyMail();
  }, [router.isReady]);

  return (
    <Box my={10} p={1} textAlign="center">
      <Link href="/">
        <Button startIcon={<HomeOutlined />} variant="contained" sx={{ textTransform: "none" }}>
          Return to Open Translation
        </Button>
      </Link>
    </Box>
  );
};

export default FinalizeSignup;
