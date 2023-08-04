import React, { useState } from "react";
import { Divider } from "primereact/divider";
import { Fieldset } from "primereact/fieldset";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const CituationComptable = () => {
  const [designDocument, setdesignDocument] = useState("");

  const HandelSubmitDocument = (e) => {
    e.preventDefault();
  };

  const [DesignFiscal, setDesignFiscal] = useState("");

  const HandelSubmitDesignFiscal = (e) => {
    e.preventDefault();
  };

  const [DesignSocial, setDesignSocial] = useState("");

  const HandelSubmitSocial = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Divider align="left">
        <div className="inline-flex align-items-center">
          <i className="pi pi-chevron-circle-down mr-2"></i>
          <b>Situation Comptable</b>
        </div>
      </Divider>

      <Fieldset
        toggleable
        collapsed={true}
        className="mt-4"
        legend="Document Comptable"
        style={{ minWidth: "100%" }}
      >
        <form>
          <div className="p-fluid formgrid grid">
            <div className="field  col-12">
              <FileUpload
                mode="basic"
                name="demo[]"
                chooseLabel="Upload"
                url="/api/upload"
                accept="image/*"
                maxFileSize={1000000}
                // onUpload={onUpload}
              />
            </div>
            <div className="field  col-5">
              <label htmlFor="design"> Design :</label>
              <InputText
                id="design"
                name="design"
                value={designDocument}
                onChange={(e) => setdesignDocument(e.target.value)}
              />
            </div>
            <div className="field  col-2  mt-4 ">
              <Button
                label="Send"
                icon="pi pi-check"
                onClick={HandelSubmitDocument}
              />
            </div>
          </div>
        </form>

        <h5 className=" mb-4 ">Bilan Comptable </h5>

        <DataTable
          scrollable
          scrollHeight="flex"
          value={[
            {
              id: "1",
              designation: "test1",
              raison_social: "test",
              annee: "2023",
              observation: "upload",
            },
            {
              id: "1",
              designation: "test1",
              raison_social: "test",
              annee: "2023",
              observation: "upload",
            },
          ]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="id"
            header="Id"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="designation"
            header="Designation"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="raison_social"
            header="Raison Social"
            style={{ width: "25%" }}
            onCellClick={() => {
              alert("testt");
            }}
          ></Column>
          <Column
            field="annee"
            header="Annee"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="observation"
            header="Observation"
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
      </Fieldset>

      <Fieldset
        toggleable
        collapsed={true}
        className="mt-4"
        legend="Document Fiscal"
        style={{ minWidth: "100%" }}
      >
        <form>
          <div className="p-fluid formgrid grid">
            <div className="field  col-12">
              <FileUpload
                mode="basic"
                name="demo[]"
                chooseLabel="Upload"
                url="/api/upload"
                accept="image/*"
                maxFileSize={1000000}
                // onUpload={onUpload}
              />
            </div>
            <div className="field  col-5">
              <label htmlFor="design"> Design :</label>
              <InputText
                id="design"
                name="design"
                value={DesignFiscal}
                onChange={(e) => setDesignFiscal(e.target.value)}
              />
            </div>
            <div className="field  col-2  mt-4 ">
              <Button
                label="Send"
                icon="pi pi-check"
                onClick={HandelSubmitDesignFiscal}
              />
            </div>
          </div>
        </form>

        <h5 className=" mb-4 ">Declaration TVA </h5>

        <DataTable
          scrollable
          scrollHeight="flex"
          value={[
            {
              id: "1",
              designation: "test1",
              raison_social: "test",
              annee: "2023",
              observation: "upload",
            },
            {
              id: "1",
              designation: "test1",
              raison_social: "test",
              annee: "2023",
              observation: "upload",
            },
          ]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="id"
            header="Id"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="designation"
            header="Designation"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="raison_social"
            header="Raison Social"
            style={{ width: "25%" }}
            onCellClick={() => {
              alert("testt");
            }}
          ></Column>
          <Column
            field="annee"
            header="Annee"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="observation"
            header="Observation"
            style={{ width: "25%" }}
          ></Column>
        </DataTable>

        <h5 className=" mb-4 ">Quittance TVA </h5>

        <DataTable
          scrollable
          scrollHeight="flex"
          value={[
            {
              id: "1",
              designation: "test1",
              raison_social: "test",
              annee: "2023",
              observation: "upload",
            },
            {
              id: "1",
              designation: "test1",
              raison_social: "test",
              annee: "2023",
              observation: "upload",
            },
          ]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="id"
            header="Id"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="designation"
            header="Designation"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="raison_social"
            header="Raison Social"
            style={{ width: "25%" }}
            onCellClick={() => {
              alert("testt");
            }}
          ></Column>
          <Column
            field="annee"
            header="Date"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="observation"
            header="Observation"
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
      </Fieldset>

      <Fieldset
        toggleable
        collapsed={true}
        className="mt-4"
        legend="Document social"
        style={{ minWidth: "100%" }}
      >
        <form>
          <div className="p-fluid formgrid grid">
            <div className="field  col-12">
              <FileUpload
                mode="basic"
                name="demo[]"
                chooseLabel="Upload"
                url="/api/upload"
                accept="image/*"
                maxFileSize={1000000}
                // onUpload={onUpload}
              />
            </div>
            <div className="field  col-5">
              <label htmlFor="design"> Design :</label>
              <InputText
                id="design"
                name="design"
                value={DesignSocial}
                onChange={(e) => setDesignSocial(e.target.value)}
              />
            </div>
            <div className="field  col-2  mt-4 ">
              <Button
                label="Send"
                icon="pi pi-check"
                onClick={HandelSubmitSocial}
              />
            </div>
          </div>
        </form>

        <h5 className=" mb-4 ">Declaration Traitment de salaire paie </h5>

        <DataTable
          scrollable
          scrollHeight="flex"
          value={[
            {
              id: "1",
              designation: "test1",
              raison_social: "test",
              annee: "2023",
              observation: "upload",
            },
            {
              id: "1",
              designation: "test1",
              raison_social: "test",
              annee: "2023",
              observation: "upload",
            },
          ]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="id"
            header="Id"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="designation"
            header="Designation"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="raison_social"
            header="Raison Social"
            style={{ width: "25%" }}
            onCellClick={() => {
              alert("testt");
            }}
          ></Column>
          <Column
            field="annee"
            header="Date"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="observation"
            header="Observation"
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
      </Fieldset>
    </>
  );
};

export default CituationComptable;
