import { Box } from "@mui/material";
import styles from "./pageLoading.module.scss";

const PageLoading = () => (
  <Box width="100%" height={200} className={styles.spinner}>
    <div />
  </Box>
);

export default PageLoading;
