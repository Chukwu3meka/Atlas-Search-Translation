import { Box } from "@mui/material";
import Image from "next/image";
import styles from "./pageLoading.module.scss";

const PageLoading = () => (
  <Box width="100%" height={200} className={styles.spinner}>
    <div />
  </Box>
  // <div className={styles.spinner} style={{ height: height ? "100%" : "100vh" }}>
  //   {/* <div>
  //     <Image src="/images/layout/ball.png" alt="SoccerMASS Advert" layout="fill" />
  //   </div> */}
  // </div>
);

export default PageLoading;
