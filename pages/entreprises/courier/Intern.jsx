import React, { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import ButtonMui from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

import { Button } from "primereact/button";

const EmptyPage = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);

  const steps = [
    {
      label: "Select campaign settings",
      description: (
        <FileUpload
          name="demo[]"
          accept=".png,.jpg,.jpeg,.gif,.jfif,.pdf,.docx"
          multiple
          maxFileSize={2000000}
          chooseLabel="Joindre"
          uploadOptions={{ className: "hidden" }}
          cancelOptions={{ className: "hidden" }}
        />
      ),
    },
    {
      label: "Create an ad group",
      description: (
        <>
          <DataTable
            value={[
              {
                id: 2,
                adresse: "adresse",
                "raison sociale": "test",
                file: "dossier.pdf",
              },
              {
                id: 2,
                adresse: "adresse",
                "raison sociale": "test",
                file: "scanner.pdf",
              },
              {
                id: 2,
                adresse: "adresse",
                "raison sociale": "test",
                file: "tasdf.pdf",
              },
              {
                id: 2,
                adresse: "adresse",
                "raison sociale": "test",
                file: "formulej.pdf",
              },
            ]}
            virtualScrollerOptions={{ itemSize: 46 }}
            selection={selectedValue}
            onSelectionChange={(e) => setSelectedValue(e.value)}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column field="id" header="Id" style={{ width: "10%" }}></Column>
            <Column
              field="adresse"
              header="Adresse"
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="file"
              header="File"
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="raison sociale"
              sortable
              header="Raison sociale"
              style={{ width: "20%" }}
            ></Column>
            <Column
              header="Show"
              style={{ width: "20%" }}
              body={
                <a
                  href="/layout/images/test.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    icon="pi pi-eye"
                    className="mr-2"
                    rounded
                    severity="info"
                  />
                </a>
              }
            ></Column>
          </DataTable>

          <Dropdown
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={[
              { name: "client1", code: "cp" },
              { name: "client2", code: "df" },
              { name: "client3", code: "ds" },
            ]}
            optionLabel="name"
            placeholder="Select a type"
            className="w-full md:w-14rem mr-3  mt-4 mb-3 "
          />
        </>
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>courier intern</h5>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 1 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <div>{step.description}</div>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <ButtonMui
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Send" : "Continue"}
                        </ButtonMui>
                        <ButtonMui
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </ButtonMui>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <ButtonMui onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </ButtonMui>
              </Paper>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;
