import React, { useState } from "react";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Fieldset } from "primereact/fieldset";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";
import { useEffect } from "react";

const EmptyPage = () => {
  // Array of roles for dropdown selection
  const roles = ["SuperAdmin", "Admin", "Comptable", "Agent"];

  // Array of affectation options for dropdown selection
  const affectation = ["safi", "casa"];

  // State variables for form data and user data
  const [FormData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    role: "",
    affectation: "",
  });

  // State variables for  user data

  const [DataUsers, setDataUsers] = useState([
    {
      nomcomplet: "John Smith",
      telephone: "123-456-7890",
      email: "john.smith@example.com",
      role: "SuperAdmin",
      affectation: "Department A",
      password: "pa55w0rd",
    },
    {
      nomcomplet: "Emma Johnson",
      telephone: "987-654-3210",
      email: "emma.johnson@example.com",
      role: "Comptable",
      affectation: "Department B",
      password: "qwerty123",
    },
  ]);

  // Event handler for input changes in the form
  const HandelChangeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  // Function to generate a random password
  function generatePassword(length) {
    const characters =
      "ABC12DEFJKhijLMNOPQRSTU67VWXYZabcdefgklm458nopGHIqrstuvwxyz039";
    const passwordArr = Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    );
    return passwordArr.join("");
  }

  // Event handler for form submission
  const HandelSubmit = (e) => {
    e.preventDefault();
    setDataUsers([
      ...DataUsers,
      {
        ...FormData,
        nomcomplet: FormData.prenom + " " + FormData.nom,
        password: generatePassword(8),
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
        {/* Fieldset for adding users */}
        <Fieldset legend="Ajouter " toggleable>
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
                <label htmlFor="role">Rôle</label>
                <Dropdown
                  id="role"
                  name="role"
                  value={FormData.role}
                  onChange={(e) => {
                    setFormData({ ...FormData, role: e.target.value });
                  }}
                  options={roles}
                  placeholder="Select One"
                ></Dropdown>
              </div>
              <div className="field col-12 md:col-4">
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

        {/* Table for displaying user data */}
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
              style={{ width: "25%" }}
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
              field="role"
              header="Role"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="affectation"
              header="Affectation"
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
