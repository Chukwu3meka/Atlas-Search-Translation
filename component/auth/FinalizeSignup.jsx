import { useEffect, useState } from "react";
import { useRouter, Router } from "next/router";

const FinalizeSignup = () => {
  const [pageReady, setPageReady] = useState(false);
  const router = useRouter();
  // const { verificationLink } = router.query;

  useEffect(() => {
    if (router.isReady) {
      const { verification, signupRef, date } = router.query;
      console.log("dsfsdfd", { verification, signupRef, date });
    }

    // codes using router.query
  }, [router.isReady]);

  // useEffect(() => {
  //   if (pageReady) {
  //     // console.log(router);
  //   }
  // }, [pageReady]);

  return <div>FinalizeSignup</div>;
};

export default FinalizeSignup;
