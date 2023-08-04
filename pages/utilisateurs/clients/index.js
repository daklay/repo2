import React, { useState } from "react";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { InputSwitch } from "primereact/inputswitch";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import instance from "../../api/axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";
import { useEffect } from "react";

const EmptyPage = () => {
  const [ShowPayment, setShowPayment] = useState(false);
  const [affectation, setAffectation] = useState([]);
  const ModePaiement = ["carte de paiement"];
  const etatPaiement = ["paiement confirmer", "paiement refuse"];
  const [Loading, setLoading] = useState(true);

  const ToastShow = useRef(null);

  // State variables for client form data

  const [FormData, setFormData] = useState({
    last_name: "",
    first_name: "",
    phone: "",
    email: "",
    service_demande: "",
    nature_dactivite: "",
    affectation: "",
    password_confirm: "",
  });

  const [error, setError] = useState({});

  // State variables for payment form data

  const [DataPaiment, setDataPaiment] = useState({
    avance: "",
    mode_paiement: "",
    date_decheance: "",
    etat_paiement: "",
    observation: "",
    reste: "",
    passed: false,
  });

  const [DataUsers, setDataUsers] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const isAuth =
      typeof window !== "undefined"
        ? window.localStorage.getItem("isAuth")
        : false;
    if (!isAuth) {
      router.push("/auth/login");
    } else if (isAuth) {
      setLoading(false);
    }

    instance
      .get("/auth/users")
      .then(({ data }) => {
        setDataUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });

    instance
      .get("/affectation/get_affectations")
      .then(({ data }) => {
        console.log(data);
        setAffectation(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Event handler for client form input changes

  const HandelChangeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  const showError = () => {
    ToastShow.current.show({
      severity: "error",
      summary: "Error",
      detail: "Complet All  info Paiment",
      life: 3000,
    });
  };

  // Event handler for client form submission

  const HandelSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  // Event handler for payment form input changes

  const HandelDataPaiment = (e) => {
    const { name, value } = e.target;
    setDataPaiment({ ...DataPaiment, [name]: value });
  };

  const showSuccess = () => {
    ToastShow.current.show({
      severity: "success",
      summary: "Success",
      detail: "successfully registered new user.",
      life: 3000,
    });
  };

  // Event handler for payment form submission

  const HandelSubmitPaiment = (e) => {
    e.preventDefault();

    const {
      first_name,
      last_name,
      phone,
      email,
      password,
      password_confirm,
      affectation,
    } = FormData;

    if (DataPaiment.passed) {
      setShowPayment(false);

      instance
        .post("/auth/register", {
          first_name,
          last_name,
          phone,
          email,
          username: first_name + " " + last_name,
          password,
          password_confirm,
        })
        .then(({ data }) => {
          if (data.response) {
            showSuccess();
            instance.post(
              "/affectation/affectation_to_user/" + affectation.id,
              {
                user_id: data.id,
              }
            );
            setError({});
          } else {
            setError(data);
          }
        });
    } else if (
      DataPaiment.mode_paiement === "" ||
      DataPaiment.etat_paiement === "" ||
      DataPaiment.date_decheance === "" ||
      DataPaiment.montent === ""
    ) {
      showError();
    } else {
      setShowPayment(false);

      instance
        .post("/auth/register", {
          first_name,
          last_name,
          phone,
          email,
          username: first_name + " " + last_name,
          password,
          password_confirm,
        })
        .then(({ data }) => {
          if (data.response) {
            showSuccess();
            setError({});
          } else {
            setError(data);
          }
        });
    }
  };

  if (Loading) {
    return (
      <div
        className=" absolute flex bg-white justify-content-center align-items-center top-0 left-0 bottom-0 right-0  bg-blue-900 "
        style={{ zIndex: "1000" }}
      >
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="grid">
        <div className="col-12">
          {/* Fieldset for adding clients */}

          <Fieldset legend="Ajouter Clients" toggleable>
            <form>
              <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-4">
                  <label htmlFor="last_name">Nom</label>
                  <InputText
                    id="last_name"
                    name="last_name"
                    type="text"
                    onChange={HandelChangeData}
                    className={error.last_name && "p-invalid"}
                    value={FormData.last_name}
                  />
                  {error.last_name && (
                    <small className="p-error">{error.last_name[0]}</small>
                  )}
                </div>
                <div className="field col-12 md:col-4">
                  <label htmlFor="first_name">Prénom</label>
                  <InputText
                    id="first_name"
                    name="first_name"
                    onChange={HandelChangeData}
                    type="text"
                    value={FormData.first_name}
                  />
                </div>
                <div className="field col-12 md:col-4">
                  <label htmlFor="phone">Téléphone</label>
                  <InputText
                    name="phone"
                    id="phone"
                    onChange={HandelChangeData}
                    className={error.phone && "p-invalid"}
                    value={FormData.phone}
                    type="text"
                  />
                  {error.phone && (
                    <small className="p-error">{error.phone[0]}</small>
                  )}
                </div>
                <div className="field col-12 md:col-6">
                  <label htmlFor="email">Email</label>
                  <InputText
                    id="email"
                    name="email"
                    onChange={HandelChangeData}
                    value={FormData.email}
                    className={error.email && "p-invalid"}
                    type="email"
                  />
                  {error.email && (
                    <small className="p-error">{error.email[0]}</small>
                  )}
                </div>
                <div className="field col-12 md:col-6">
                  <label htmlFor="nature_dactivite">Nature d’activité</label>
                  <InputText
                    id="nature_dactivite"
                    name="nature_dactivite"
                    onChange={HandelChangeData}
                    value={FormData.nature_dactivite}
                    type="text"
                  />
                </div>
                <div className="field col-12 md:col-6">
                  <label htmlFor="password">Password</label>
                  <InputText
                    id="password"
                    name="password"
                    onChange={HandelChangeData}
                    value={FormData.password}
                    className={error.password && "p-invalid"}
                    type="email"
                  />
                  {error.password && (
                    <small className="p-error">{error.password[0]}</small>
                  )}
                </div>
                <div className="field col-12 md:col-6">
                  <label htmlFor="password_confirm">
                    Password Confirmation
                  </label>
                  <InputText
                    id="password_confirm"
                    name="password_confirm"
                    onChange={HandelChangeData}
                    value={FormData.password_confirm}
                    className={error.password_confirm && "p-invalid"}
                    type="text"
                  />
                  {error.password_confirm && (
                    <small className="p-error">
                      {error.password_confirm[0]}
                    </small>
                  )}
                </div>
                <div className="field col-12 md:col-6">
                  <label htmlFor="service_demande">Service demandé</label>
                  <InputText
                    id="service_demande"
                    name="service_demande"
                    onChange={HandelChangeData}
                    value={FormData.service_demande}
                    type="text"
                  />
                </div>
                <div className="field col-12 md:col-6">
                  <label htmlFor="affectation">Affectation</label>
                  <Dropdown
                    value={FormData.affectation}
                    onChange={(e) =>
                      setFormData({ ...FormData, affectation: e.target.value })
                    }
                    options={affectation}
                    optionLabel="name"
                    filter
                    placeholder="Select an affectation"
                  />
                </div>
              </div>
              <Button
                onClick={HandelSubmit}
                label="Ajouter Un Utilisateur"
                icon="pi pi-plus-circle"
              />
            </form>
          </Fieldset>

          {/* Table for displaying user data */}

          <div className="card" style={{ marginTop: "3%" }}>
            <DataTable
              value={DataUsers}
              paginator
              dataKey="id"
              rows={10}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="username"
                header="UserName"
                sortable
                style={{ width: "23%" }}
                body={(user) => user.first_name + " " + user.last_name}
              ></Column>
              <Column
                field="email"
                header="Email"
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="phone"
                header="phone"
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="service"
                header="Service Demande"
                style={{ width: "26%" }}
              ></Column>
              <Column
                field="activity"
                header="Nature Dactivite"
                style={{ width: "26%" }}
              ></Column>
              <Column
                field="affectation"
                header="Affectation"
                style={{ width: "25%" }}
                body={(user) =>
                  user.affectation !== null ? user.affectation.address : ""
                }
              ></Column>
              <Column header="Action" style={{ width: "25%" }}></Column>
            </DataTable>
          </div>
        </div>
      </div>

      <Toast ref={ToastShow} />

      <Dialog
        header="Paiment "
        visible={ShowPayment}
        style={{ width: "50vw" }}
        maximizable
        onHide={() => setShowPayment(false)}
        footer={
          <>
            <Button
              label="Anuller"
              icon="pi pi-times"
              onClick={() => setShowPayment(false)}
              className="p-button-text"
            />
            <Button
              label="Confirmer"
              icon="pi pi-check"
              onClick={HandelSubmitPaiment}
              autoFocus
            />
          </>
        }
      >
        {/* Fieldset for payment */}

        <Fieldset legend="Information du paiement">
          <form>
            <div className="p-fluid formgrid grid">
              <div className="field  col-12">
                <label htmlFor="avance">Avance :</label>
                <InputText
                  id="avance"
                  name="avance"
                  type="text"
                  onChange={HandelDataPaiment}
                  value={DataPaiment.avance}
                />
              </div>
              <div className="field   col-12">
                <label htmlFor="mode_paiement">Mode de paiement :</label>
                <Dropdown
                  value={DataPaiment.mode_paiement}
                  onChange={(e) =>
                    setDataPaiment({
                      ...DataPaiment,
                      mode_paiement: e.target.value,
                    })
                  }
                  options={ModePaiement}
                  placeholder=".."
                  className="w-full"
                />
              </div>
              <div className="field flex col-12">
                <label htmlFor="passed" className=" mr-3 ">
                  Passed:
                </label>
                <InputSwitch
                  checked={DataPaiment.passed}
                  id="passed"
                  name="passed"
                  onChange={HandelDataPaiment}
                />
              </div>
              <div className="field  col">
                <label htmlFor="reste">Reste :</label>
                <InputText
                  id="reste"
                  name="reste"
                  type="text"
                  onChange={HandelDataPaiment}
                  value={DataPaiment.reste}
                />
              </div>
              <div className="field  col">
                <label htmlFor="date_decheance">Date d&apos;échéance :</label>
                <InputText
                  name="date_decheance"
                  id="date_decheance"
                  onChange={HandelDataPaiment}
                  value={DataPaiment.date_decheance}
                  type="date"
                />
              </div>
              <div className="field  col">
                <label htmlFor="etat_paiement">État de paiement :</label>
                <Dropdown
                  value={DataPaiment.etat_paiement}
                  onChange={(e) =>
                    setDataPaiment({
                      ...DataPaiment,
                      etat_paiement: e.target.value,
                    })
                  }
                  options={etatPaiement}
                  placeholder=".."
                  className="w-full "
                />
              </div>
              <div className="field col-12 ">
                <label htmlFor="observation">Observation(facultative) :</label>
                <InputTextarea
                  placeholder="Vous pouvez specifier de details du paiment au niveau de ce champ"
                  rows={5}
                  name="observation"
                  value={DataPaiment.observation}
                  onChange={HandelDataPaiment}
                  cols={30}
                />
              </div>
              <div className="field col-12 ">
                <label htmlFor="piece_joint">
                  la pièce jointe du paiement :
                </label>
                <FileUpload
                  name="demo[]"
                  accept=".png,.jpg,.jpeg,.gif,.jfif,.pdf,.docx"
                  multiple
                  id="piece_joint"
                  maxFileSize={2000000}
                  chooseLabel="Joindre"
                  uploadOptions={{ className: "hidden" }}
                  cancelOptions={{ className: "hidden" }}
                />
              </div>
            </div>
          </form>
        </Fieldset>
      </Dialog>
    </>
  );
};

export default EmptyPage;
