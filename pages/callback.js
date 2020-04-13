import React, { useEffect } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import auth0Client from "../services/auth0";
import { useRouter } from "next/router";

const Callback = (props) => {
  const router = useRouter();
  useEffect(() => {
    (async function () {
      await auth0Client.handleAuthentication();
      router.push("/");
    })();
  });
  return (
    <BaseLayout>
      <BasePage>
        <h1>callback</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default Callback;
