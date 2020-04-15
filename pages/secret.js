import React, { useEffect, useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import { getSecretData } from "../actions";

const Secret = (props) => {
  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const secretData = await getSecretData();
        setData(secretData);
      } catch (ex) {
        console.log(ex);
      }
    })();
  }, []);

  //we cannot call data inside the useEffect
  // console.log("data", data);

  return (
    <BaseLayout {...props.auth}>
      <BasePage>
        <p>{props.pageProps.superValue}</p>
        <h1>secret</h1>
        <p>{data}</p>
      </BasePage>
    </BaseLayout>
  );
};
Secret.getInitialProps = async (ctx) => {
  const another = await getSecretData(ctx.req);

  return { superValue: another };
};
export default withAuth(Secret);
