import React, { useState } from "react";
import Link from "next/link";

import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import instance from "../../api/axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const EmptyPage = () => {
  const [Loading, setLoading] = useState(true);
  const [ShowUpdate, setShowUpdate] = useState(false);
  const [DeleteAffectation, setDeleteAffectation] = useState(false);

  const ToastShow = useRef(null);

  const [FormData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    email: "",
    phone: "",
  });

  const [DataAffectation, setDataAffectation] = useState([]);

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
      .get("/affectation/get_affectations")
      .then(({ data }) => {
        console.log(data);
        setDataAffectation(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showSuccess = () => {
    ToastShow.current.show({
      severity: "success",
      summary: "Success",
      detail: "successfully Add new affectation.",
      life: 3000,
    });
  };

  const HandelChangeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  const HandelSubmit = (e) => {
    e.preventDefault();

    console.log(FormData);

    instance.post("/affectation/add_affectation", FormData).then(({ data }) => {
      showSuccess();
    });
  };

  const [DataUpdate, setDataUpdate] = useState({
    id: "",
    name: "",
    city: "",
    address: "",
    email: "",
    phone: "",
  });

  const HandelDataUpdate = (e) => {
    const { name, value } = e.target;
    setDataUpdate({ ...DataUpdate, [name]: value });
  };

  const HandelSubmitUpdate = (e) => {
    e.preventDefault();
    setShowUpdate(false);
    const { name, city, address, email, phone } = DataUpdate;
    instance.put("affectation/update_affectation/" + DataUpdate.id, {
      name,
      city,
      email,
      phone,
      address,
    });
  };

  const UpdateAffectation = (affectation) => {
    setShowUpdate(true);
    setDataUpdate(affectation);
  };

  const [AffectationId, setAffectationId] = useState(0);

  const showDeleteAffectation = (affectation) => {
    setDeleteAffectation(true);
    setAffectationId(affectation.id);
  };

  const showDeleteSuccess = () => {
    ToastShow.current.show({
      severity: "success",
      summary: "Success",
      detail: " affectation Deleted .",
      life: 3000,
    });
  };

  const DeleteAffectationSend = () => {
    setDeleteAffectation(false);
    instance
      .delete("/affectation/delete_affectation/" + AffectationId)
      .then((res) => {
        showDeleteSuccess();
      });
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
                  <label htmlFor="name">Name</label>
                  <InputText
                    id="name"
                    name="name"
                    type="text"
                    onChange={HandelChangeData}
                    value={FormData.name}
                  />
                </div>
                <div className="field col-12 md:col-4">
                  <label htmlFor="city">City</label>
                  <InputText
                    id="city"
                    name="city"
                    onChange={HandelChangeData}
                    type="text"
                    value={FormData.city}
                  />
                </div>
                <div className="field col-12 md:col-4">
                  <label htmlFor="address">Address</label>
                  <InputText
                    name="address"
                    id="address"
                    onChange={HandelChangeData}
                    value={FormData.address}
                    type="text"
                  />
                </div>
                <div className="field col-12 md:col-6">
                  <label htmlFor="email">Email</label>
                  <InputText
                    id="email"
                    name="email"
                    onChange={HandelChangeData}
                    value={FormData.email}
                    type="email"
                  />
                </div>
                <div className="field col-12 md:col-6">
                  <label htmlFor="phone">Phone</label>
                  <InputText
                    id="phone"
                    name="phone"
                    onChange={HandelChangeData}
                    value={FormData.phone}
                    type="text"
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
              value={DataAffectation}
              paginator
              dataKey="id"
              rows={10}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="name"
                header="Name"
                sortable
                style={{ width: "23%" }}
              ></Column>
              <Column
                field="city"
                header="City"
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="address"
                header="Address"
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="email"
                header="Email"
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="phone"
                header="Phone"
                style={{ width: "26%" }}
              ></Column>
              <Column
                header="Action"
                // style={{ width: "25%" }}
                style={{ minWidth: "12rem" }}
                body={(affectation) => (
                  <>
                    <Button
                      icon="pi pi-pencil"
                      rounded
                      outlined
                      className="mr-2"
                      onClick={() => UpdateAffectation(affectation)}
                    />
                    <Button
                      icon="pi pi-trash"
                      rounded
                      outlined
                      severity="danger"
                      onClick={() => showDeleteAffectation(affectation)}
                    />
                  </>
                )}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>

      <Toast ref={ToastShow} />

      <Dialog
        header="Update"
        visible={ShowUpdate}
        style={{ width: "50vw" }}
        maximizable
        onHide={() => setShowUpdate(false)}
        footer={
          <>
            <Button
              label="Anuller"
              icon="pi pi-times"
              onClick={() => setShowUpdate(false)}
              className="p-button-text"
            />
            <Button
              label="Confirmer"
              icon="pi pi-check"
              onClick={HandelSubmitUpdate}
              autoFocus
            />
          </>
        }
      >
        {/* Fieldset for payment */}

        <Fieldset legend="Update Affectation">
          <form>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-4">
                <label htmlFor="name">Name</label>
                <InputText
                  id="name"
                  name="name"
                  type="text"
                  onChange={HandelDataUpdate}
                  value={DataUpdate.name}
                />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="city">City</label>
                <InputText
                  id="city"
                  name="city"
                  onChange={HandelDataUpdate}
                  type="text"
                  value={DataUpdate.city}
                />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="address">Address</label>
                <InputText
                  name="address"
                  id="address"
                  onChange={HandelDataUpdate}
                  value={DataUpdate.address}
                  type="text"
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="email">Email</label>
                <InputText
                  id="email"
                  name="email"
                  onChange={HandelDataUpdate}
                  value={DataUpdate.email}
                  type="email"
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="phone">Phone</label>
                <InputText
                  id="phone"
                  name="phone"
                  onChange={HandelDataUpdate}
                  value={DataUpdate.phone}
                  type="text"
                />
              </div>
            </div>
          </form>
        </Fieldset>
      </Dialog>

      <Dialog
        visible={DeleteAffectation}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={() => (
          <>
            <Button
              label="No"
              icon="pi pi-times"
              outlined
              onClick={() => setDeleteAffectation(false)}
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              severity="danger"
              onClick={DeleteAffectationSend}
            />
          </>
        )}
        onHide={() => setDeleteAffectation(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>Are you sure you want to delete ?</span>
        </div>
      </Dialog>
    </>
  );
};

export default EmptyPage;
