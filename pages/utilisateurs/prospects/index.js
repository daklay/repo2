import React, { useState } from "react";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";
import { useEffect } from "react";

const EmptyPage = () => {
  const affectation = ["site safi", "site casa"];

  const [FormData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    service_demande: "",
    nature_dactivite: "",
    affectation: "",
    note: "",
  });

  const [DataUsers, setDataUsers] = useState([
    {
      nomcomplet: "John Smith",
      telephone: "123-456-7890",
      email: "john.smith@example.com",
      service_demande: "IT Support",
      nature_dactivite: "Software Development",
      affectation: "site casa",
      password: "pa55w0rd",
      note: "test",
    },
    {
      nomcomplet: "Emma Johnson",
      telephone: "987-654-3210",
      email: "emma.johnson@example.com",
      service_demande: "HR Consultancy",
      nature_dactivite: "Recruitment",
      affectation: "site marrakech",
      password: "od94jmf",
      note: "test",
    },
  ]);

  const HandelChangeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  function GeneratePassword(length) {
    const characters =
      "ABC12DEFJKhijLMNOPQRSTU67VWXYZabcdefgklm458nopGHIqrstuvwxyz039";
    const passwordArr = Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    );
    return passwordArr.join("");
  }

  const HandelSubmit = (e) => {
    e.preventDefault();
    setDataUsers([
      ...DataUsers,
      {
        ...FormData,
        nomcomplet: FormData.prenom + " " + FormData.nom,
        password: GeneratePassword(8),
      },
    ]);
  };

  const [Loading, setLoading] = useState(true);

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
  }, []);

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
    <div className="grid">
      <div className="col-12">
        <Fieldset legend="Prospects" toggleable>
          <form>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-4">
                <label htmlFor="nom">Nom</label>
                <InputText
                  id="nom"
                  name="nom"
                  type="text"
                  onChange={HandelChangeData}
                  value={FormData.nom}
                />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="prenom">Prénom</label>
                <InputText
                  id="prenom"
                  name="prenom"
                  onChange={HandelChangeData}
                  type="text"
                  value={FormData.prenom}
                />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="telephone">Téléphone</label>
                <InputText
                  name="telephone"
                  id="telephone"
                  onChange={HandelChangeData}
                  value={FormData.telephone}
                  type="text"
                />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="email">Email</label>
                <InputText
                  id="email"
                  name="email"
                  onChange={HandelChangeData}
                  value={FormData.email}
                  type="email"
                />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="nature_dactivite">Nature d’activité</label>
                <InputText
                  id="nature_dactivite"
                  name="nature_dactivite"
                  onChange={HandelChangeData}
                  value={FormData.nature_dactivite}
                  type="text"
                />
              </div>
              <div className="field col-12 md:col-4">
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
                <label htmlFor="note">Note</label>
                <InputText
                  id="note"
                  name="note"
                  onChange={HandelChangeData}
                  value={FormData.note}
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
        <div className="card" style={{ marginTop: "3%" }}>
          <DataTable
            value={DataUsers}
            paginator
            rows={5}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              field="nomcomplet"
              header="NomComplet"
              sortable
              style={{ width: "23%" }}
            ></Column>
            <Column
              field="password"
              header="Password"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="telephone"
              header="Telephone"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="email"
              header="Email"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="service_demande"
              header="Service Demande"
              style={{ width: "26%" }}
            ></Column>
            <Column
              field="nature_dactivite"
              header="Nature Dactivite"
              style={{ width: "26%" }}
            ></Column>
            <Column
              field="affectation"
              header="Affectation"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="note"
              header="Note"
              style={{ width: "25%" }}
            ></Column>
            <Column header="Action" style={{ width: "25%" }}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;
