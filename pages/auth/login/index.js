import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import AppConfig from "../../../layout/AppConfig";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "../../../layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import instance from "../../api/axios";
import { Message } from "primereact/message";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);

  const HandelSubmit = (e) => {
    e.preventDefault();

    instance
      .post("/auth/token", {
        username: email,
        password: password,
        grant_type: "password",
        client_id: "XN2pZNeCvQrwNpmZf0Wo2zpIpHvzDbDWOickwHX0",
        client_secret:
          "6HOmnCE7BEKjyu0jASwSZ0YcPfaN5wxqRrzQ0N4LK6DQnDqSwKPYxzVVIJGY35FO3QXxcHD6KqCRARTnbhiHfEXJbvwnDXP0FAK7XkMnEAQ08lKBN9UyxumOHSQ0wjxU",
      })
      .then(({ data }) => {
        localStorage.setItem("isAuth", true);
        localStorage.setItem("auth_token", data.access_token);
        router.push("/");
      })
      .catch(() => {
        setError(true);
      });
  };

  const router = useRouter();
  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <img
          src={`/layout/images/logo.png`}
          alt="Sakai logo"
          className="mb-5 w-6rem flex-shrink-0"
        />
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: "53px" }}
          >
            <div className="text-center mb-5">
              <span className="text-600 font-medium">
                Connectez-vous avec votre compte
              </span>
            </div>

            {error && (
              <Message
                className=" w-full block"
                style={{ marginBottom: "19px" }}
                severity="error"
                text="Password or  Email is incorrect"
              />
            )}

            <div>
              <label
                htmlFor="email1"
                className="block text-900 text-xl font-medium mb-2"
              >
                Adresse eeee-mail
              </label>
              <InputText
                inputid="email1"
                type="text"
                placeholder="Email address"
                className="w-full md:w-30rem mb-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "1rem" }}
              />

              <label
                htmlFor="password1"
                className="block text-900 font-medium text-xl mb-2"
              >
                Mot de passe
              </label>
              <Password
                inputid="password1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                toggleMask
                className="w-full mb-5"
                inputClassName="w-full p-3 md:w-30rem"
              ></Password>

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox
                    inputid="rememberme1"
                    checked={checked}
                    onChange={(e) => setChecked(e.checked)}
                    className="mr-2"
                  ></Checkbox>
                  <label htmlFor="rememberme1">Souviens-toi de moi</label>
                </div>
                <a
                  className="font-medium no-underline ml-2 text-right cursor-pointer"
                  style={{ color: "var(--primary-color)" }}
                >
                  Mot de passe oublié?
                </a>
              </div>
              <Button
                label="Connexion"
                className="w-full p-3 text-xl"
                onClick={HandelSubmit}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return (
    <React.Fragment>
      {page}
      <AppConfig simple />
    </React.Fragment>
  );
};
export default LoginPage;
