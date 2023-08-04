import React, { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider';
import { Button as Button2 } from 'primereact/button';
import { InputText } from "primereact/inputtext";

const EmptyPage = () => {
    const [selectedCity, setSelectedCity] = React.useState(null);
    const [designation, setDesignation] = useState({ value: 'RC model j', option: ['RC model j', ' Déclaration CNSS', ' Déclaration CNSS', 'autre'] });
    const [data, setData] = useState({ autre: '' });
    const steps = [
        {
            label: 'Joindre le document',
            description: <input type='file' />,
        },
        {
            label: 'Envoyer le document',
            description: <>
                <div className="p-fluid formgrid grid">
                    <div className="field col-6 md:col-6">
                        <label htmlFor="Entreprise" className='md:mr-3'>Designation</label>
                        <Dropdown
                            id="Entreprise"
                            value={designation.value}
                            options={designation.option}
                            onChange={(e) =>
                                setDesignation({
                                  ...designation,
                                  value: e.target.value,
                                })
                              }
                            placeholder="type de document"
                        />{" "}
                    </div>
                    {designation.value == 'autre' && <div className="field col-12 md:col-6">
                        <label htmlFor="Entreprise" className='md:mr-3' style={{ color: 'white' }}>autre</label>
                        <InputText
                            name="date_debut"
                            value={data.autre}
                            placeholder='autre'
                            onChange={(e) =>
                                setDataFormUpdate({
                                    ...data,
                                    autre: e.target.value,
                                })
                            }
                        />
                    </div>}
                    <div className="field col-6 md:col-12">
                        <label htmlFor="date_debut" className='md:mr-3'>Raison sociale </label>
                        <Dropdown
                            id="date_debut"
                            name="date_debut"
                            value={'societe A'}
                            options={['societe A', ' societe b', ' societe c']}
                            placeholder="enter raison sociale"
                        //   value={DataFormAjouter.date_debut}
                        //   onChange={(e) =>
                        //     setDataFormAjouter({
                        //       ...DataFormAjouter,
                        //       date_debut: e.target.value,
                        //     })
                        //   }
                        />
                    </div>
                    {/* <div className="field col-6 md:col-12">
                <label htmlFor="date_fin" className='md:mr-3'>Date </label>
                <InputText
                    name="date_fin"
                    id="date_fin"
                    placeholder="entrer une date"
                //   value={DataFormAjouter.date_fin}
                //   onChange={(e) =>
                //     setDataFormAjouter({
                //       ...DataFormAjouter,
                //       date_fin: e.target.value,
                //     })
                //   }
                />
              </div> */}
                </div>
            </>,
        }
    ];
    const [activeStep, setActiveStep] = React.useState(0);

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
                    <h5>courier extern(ocr)</h5>
                    <Box sx={{ maxWidth: 400 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                        optional={
                                            index === 2 ? (
                                                <Typography variant="caption">Last step</Typography>
                                            ) : null
                                        }
                                    >
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                        <Typography>{step.description}</Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'ajouter' : 'Continue'}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                    Reset
                                </Button>
                            </Paper>
                        )}
                    </Box>
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            {/* <i className="pi pi-download mr-2"></i> */}
                            <b>entreprises</b>
                        </div>
                    </Divider>
                    <DataTable value={[{ id: 2, adresse: 'adresse', 'raison sociale': 'test', doc: 'tet.pdf' }, { id: 2, adresse: 'adresse', 'raison sociale': 'test', doc: 'tet.pdf' }, { id: 2, adresse: 'adresse', 'raison sociale': 'test', doc: 'tet.pdf' }, { id: 2, adresse: 'adresse', 'raison sociale': 'test', doc: 'tet.pdf' }]} virtualScrollerOptions={{ itemSize: 46 }}>
                        <Column field="id" header="Id" style={{ width: '20%' }}></Column>
                        <Column field="adresse" header="Designation" style={{ width: '20%' }}></Column>
                        <Column field="raison sociale" header="Raison sociale" style={{ width: '20%' }}></Column>
                        <Column field="doc" header="Doc" style={{ width: '20%' }}></Column>
                    </DataTable>
                    <Button2 label="valider" className='mt-4' />
                </div>
            </div>
        </div>
    );
};

export default EmptyPage;
