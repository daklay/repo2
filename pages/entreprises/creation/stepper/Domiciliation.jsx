import { Button } from 'primereact/button';
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { SelectButton } from 'primereact/selectbutton';
//pdf lib
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import axios from '../../../api/axios';


export default function Domiciliation(props) {
  const [domiciliationData, setDomiciliationData] = useState({ contratBail: false });
  const [pdfBytesContrat, setPdfBytesContrat] = useState(null);
  const [pdfBytesAnnexe, setPdfBytesAnnexe] = useState(null);
  const [domiciliationNot, setDomiciliationNot] = useState();
  const currentDate = new Date().toLocaleDateString();
  const [contratDomiciliation, setContratDomiciliation] = useState('');
  const [annex, setAnnex] = useState('');
  const [files, setFile] = {domiciliation:"",annexe:""};
  const [visible, setVisible] = useState(false);
  const Entreprise = ["Meta", "Appel", "Tesla", "AliBaba", "AliMama"];
  const [DataFormUpdate, setDataFormUpdate] = useState({
    libelle: "",
    date_debut: "",
    date_fin: "",
    adress: '',
  });
  const handleContrat = (bol) => {
    setDomiciliationData({ ...domiciliationData, contratBail: bol })
  }
  const options = [{ icon: 'pi pi-clock', value: "En cours" }, { icon: 'pi pi-check', value: "Validé" }, { icon: 'pi pi-check', value: "pret" }];
  const [value, setValue] = useState(options[0]);
  const [btnStatus, setBtnStatus] = useState(options[0]);
  const [status, setStatus] = useState({
    status: "",
    actionRequise: ""
  });
  const handleStatus = async () => {
    const data = {
      status: btnStatus == "En cours" ? 'PE' : btnStatus == "Validé" ? "CO" : "AP",
      current_step: props.companyId,
    };
    console.log(data)
    // const response = await axios.put(`/company/update_company/${props.companyId}`, data);
    // console.log(response)
  }
  const justifyTemplate = (option) => {
    return <i className={option.icon}></i>;
  }
  const handleActionRequise = async () => {
    const response = await axios.post(`/notification/createNotification`, {
      content: status.actionRequise,
      company_id: props.companyId,
      current_step: props.current_step,
      type: 'AR'
    });
    console.log(response);
  }
  useEffect(() => {
    const getCompanyInfo = async () => {
      const response = await axios.get(`/company/get_company/${props.companyId}`);
      setContratDomiciliation(response.data)
      console.log(response.data);
    }
    if (props.companyId) {
      getCompanyInfo();
    }
  }, [])
  useEffect(() => {
    const generatePDFDomiciliation = async () => {

      const formUrl = '../pdfs/Contrat de domiciliation(formfill).pdf';
      const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(formPdfBytes);
      const form = pdfDoc.getForm()
      const field1 = form.getTextField('field1')// proposition denomination step1
      const field2 = form.getTextField('field2')// ice step2
      const field3 = form.getTextField('field3')// position de demandeur step1
      const field4 = form.getTextField('field4')// la birthdate step1
      const field5 = form.getTextField('field5')// cin step1
      const field6 = form.getTextField('field6')// adresse step1
      const field7 = form.getTextField('field7')//tel step1
      const field8 = form.getTextField('field8')//adress step1
      const field9 = form.getTextField('field9')//date domiciliation
      const field10 = form.getTextField('field10')//date domiciliation
      const field11 = form.getTextField('field11')//date domiciliation
      const field12 = form.getTextField('field12')//docmiliation prix
      const field13 = form.getTextField('field13')//date de systeme (curr)
      const field14 = form.getTextField('field14')
      const field15 = form.getTextField('field15')
      field1.setText(contratDomiciliation.name)
      field2.setText(contratDomiciliation.certificatNegatif?.ice)
      // field3.setText(contratDomiciliation.user.userType)
      field4.setText(contratDomiciliation.user?.nationality)
      field5.setText(contratDomiciliation.user?.birth_date)
      field6.setText(contratDomiciliation.user?.identity?.number)
      // field7.setText('adresse')
      field8.setText(contratDomiciliation.user?.phone)
      field9.setText(contratDomiciliation.user?.email)
      // field10.setText('duree')
      // field11.setText('datedebut')
      // field12.setText('datefin')
      // field13.setText('pris')
      // field14.setText('duree')
      field15.setText(currentDate)
      const pdfBytes = await pdfDoc.save()
      setPdfBytesContrat(pdfBytes);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setFile({...files, domiciliation:blob});
    }
    const generatePDFAnnexe = async () => {
      const formUrl = '../pdfs/Annexe(formfill).pdf';
      const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(formPdfBytes);
      const form = pdfDoc.getForm()
      const field1 = form.getTextField('field1')// proposition denomination step1
      const field2 = form.getTextField('field2')// ice step2
      const field3 = form.getTextField('field3')// position de demandeur step1
      const field4 = form.getTextField('field4')// la birthdate step1
      const field5 = form.getTextField('field5')// cin step1
      const field6 = form.getTextField('field6')// adresse step1
      const field7 = form.getTextField('field7')//tel step1
      const field8 = form.getTextField('field8')//adress step1
      const field9 = form.getTextField('field9')//date domiciliation
      const field10 = form.getTextField('field10')//date domiciliation
      const field11 = form.getTextField('field11')//date domiciliation
      const field12 = form.getTextField('field12')//docmiliation prix
      const field13 = form.getTextField('field13')//date de systeme (curr)
      const field14 = form.getTextField('field14')
      const field15 = form.getTextField('field15')
      const field16 = form.getTextField('field16')
      const field17 = form.getTextField('field17')
      const field18 = form.getTextField('field18')
      const field19 = form.getTextField('field19')
      const field20 = form.getTextField('field20')
      const field21 = form.getTextField('field21')
      const field22 = form.getTextField('field22')
      const field23 = form.getTextField('field23')
      field1.setText(`${contratDomiciliation.user?.first_name} ${contratDomiciliation.user?.last_name}`)
      field2.setText(contratDomiciliation.user?.birth_date)
      field3.setText(contratDomiciliation.user?.identity_number)
      // field4.setText('adress')
      field5.setText(contratDomiciliation.user?.phone)
      field6.setText(contratDomiciliation.user?.email)
      // field7.setText('adress')
      field8.setText(`${contratDomiciliation.user?.first_name} ${contratDomiciliation.user?.last_name}`)
      field9.setText(`${contratDomiciliation.user?.first_name} ${contratDomiciliation.user?.last_name}`)
      field10.setText(contratDomiciliation?.name)
      // field11.setText('adress')
      field12.setText(contratDomiciliation.user?.phone)
      field13.setText(contratDomiciliation.user?.first_name)
      field14.setText(contratDomiciliation.user?.birth_date)
      field15.setText(contratDomiciliation.user?.identity_number)
      // field16.setText('adress')
      field17.setText(contratDomiciliation?.name)
      field18.setText(`${contratDomiciliation.user?.first_name} ${contratDomiciliation.user?.last_name}`)
      field19.setText(contratDomiciliation.user?.birth_date)
      field20.setText(contratDomiciliation.user?.identity_number)
      // field21.setText('adress')
      field22.setText(contratDomiciliation?.name)
      field23.setText(currentDate)
      const pdfBytes = await pdfDoc.save()
      setPdfBytesAnnexe(pdfBytes);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setFile({...files, annexe:blob});
    }
    generatePDFDomiciliation()
    generatePDFAnnexe()
  }, [contratDomiciliation])
  const renderPDFAnnexe = () => {
    if (typeof window !== 'undefined') {
      const blob = new Blob([pdfBytesAnnexe], { type: 'application/pdf' });
      const dataUrl = URL.createObjectURL(blob);

      return (
        <iframe
          src={dataUrl}
          // src={'../pdfs/rc1.pdf'}
          title="PDF Viewer"
          width="100%"
          height="500px"
        >
        </iframe>
      )
    }
  }
  const renderPDFDomiciliation = () => {
    if (typeof window !== 'undefined') {
      const blob = new Blob([pdfBytesContrat], { type: 'application/pdf' });
      const dataUrl = URL.createObjectURL(blob);

      return (
        <iframe
          src={dataUrl}
          // src={'../pdfs/rc1.pdf'}
          title="PDF Viewer"
          width="100%"
          height="500px"
        >
        </iframe>
      )
    }
  }
  const handleSubmitAdresse = async (contrat) => {
    if (contrat == 'bail') {
      const response = await axios.post(`/stepper/domiciliation/${props.companyId}`, {
        contratDeBail: { adresse: DataFormUpdate.adress },
      });
      console.log(response);
    } else {
      const response = await axios.post(`/stepper/domiciliation/${props.companyId}`, {
        contratDomiciliation: { adresse: DataFormUpdate.adress },
      });
      console.log(response);
    }
  }
  return (
    <>
      <div className="p-fluid formgrid grid">
        <div className="field col-12 md:col-12">
          <p>adresse siège social :{DataFormUpdate.adress}</p>
          <span className="p-buttonset">
            <Button label="contrat de bail" style={domiciliationData.contratBail ? { color: '' } : { backgroundColor: 'white', color: 'grey' }} onClick={() => handleContrat(true)} />
            <Button label="contrat de domiciliation" style={domiciliationData.contratBail ? { backgroundColor: 'white', color: 'grey' } : { color: '' }} onClick={() => handleContrat(false)} />
          </span>
        </div>
        {
          domiciliationData.contratBail ? <>
            <div className="field col-12 md:col-2">
              <Button label="upload " icon="pi pi-upload" />
            </div>
            <div className="field col-12 md:col-8">
              <InputText
                name="date_debut"
                value={DataFormUpdate.adress}
                placeholder='adresse siège social'
                onChange={(e) =>
                  setDataFormUpdate({
                    ...DataFormUpdate,
                    adress: e.target.value,
                  })
                }
              />
            </div>
            <div className="field col-12 md:col-2">
              <Button label="save" onClick={() => handleSubmitAdresse('bail')} />
            </div>
          </>
            : <>
              <div className="field col-12 md:col-4">
                <Button label="creer une domiciliattion" onClick={() => setVisible(true)} />
              </div>
              <div className="field col-12 md:col-6">
                <InputText
                  name="date_debut"
                  value={DataFormUpdate.adress}
                  placeholder='adresse siège social'
                  onChange={(e) =>
                    setDataFormUpdate({
                      ...DataFormUpdate,
                      adress: e.target.value,
                    })
                  }
                />
              </div>
              <div className="field col-12 md:col-2">
                <Button label="save" onClick={() => handleSubmitAdresse('domiciliation')} />
              </div>
              <div className="field col-12 md:col-12">
                <p>contrat de domiciliation :</p>
                {/* <Editor value={contratDomiciliation} onTextChange={(e) => setContratDomiciliation(e.htmlValue)} style={{ height: '320px' }} /> */}
                <div style={{ height: "500px" }}>{renderPDFDomiciliation()}</div>
              </div>
              {/* <div className="field col-12 md:col-3">
              <Button
                type="button"
                className="p-button-success"
                label="imprimer"
              />
            </div> */}
              <div className="field col-12 md:col-4">
                <Button label="envoyer au client" className='p-button-success' />
              </div>
              <div className="field col-12 md:col-12">
                <p>annexe :</p>
                {/* <Editor value={annex} onTextChange={(e) => setAnnex(e.htmlValue)} style={{ height: '320px' }} /> */}
                <div style={{ height: "500px" }}>{renderPDFAnnexe()}</div>
              </div>
              {/* <div className="field col-12 md:col-3">
              <Button
                type="button"
                className="p-button-success"
                label="imprimer"
              />
            </div> */}
              <div className="field col-12 md:col-4">
                <Button label="envoyer au client" className="p-button-success" />
              </div>
              <Dialog visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <Fieldset legend="Formulaire de recherche">
                  <form>
                    <div className="p-fluid formgrid grid">
                      <div className="field col-12 md:col-6">
                        <label htmlFor="Entreprise">Entreprise</label>
                        <Dropdown
                          id="Entreprise"
                          value={DataFormUpdate.libelle}
                          onChange={(e) =>
                            setDataFormUpdate({
                              ...DataFormAjouter,
                              libelle: e.target.value,
                            })
                          }
                          options={Entreprise}
                          placeholder="Select a Country"
                          filter
                        />
                      </div>
                      <div className="field col-12 md:col-6">
                        <label htmlFor="Entreprise">pack de creation</label>
                        <Dropdown
                          id="Entreprise"
                          value={DataFormUpdate.libelle}
                          onChange={(e) =>
                            setDataFormUpdate({
                              ...DataFormAjouter,
                              libelle: e.target.value,
                            })
                          }
                          options={['6 mois', '12 mois', '24 mois']}
                        />
                      </div>
                      <div className="field col-12 md:col-6">
                        <label htmlFor="date_debut">Date debut : </label>
                        <InputText
                          type="date"
                          id="date_debut"
                          name="date_debut"
                          value={DataFormUpdate.date_debut}
                          onChange={(e) =>
                            setDataFormUpdate({
                              ...DataFormAjouter,
                              date_debut: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="field col-12 md:col-6">
                        <label htmlFor="date_fin">Date fin :</label>
                        <InputText
                          type="date"
                          name="date_fin"
                          id="date_fin"
                          value={DataFormUpdate.date_fin}
                          onChange={(e) =>
                            setDataFormUpdate({
                              ...DataFormAjouter,
                              date_fin: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="field col-12 md:col-12">
                        <label>La pièce jointe:</label>
                        <FileUpload
                          name="demo[]"
                          accept=".png,.jpg,.jpeg,.gif,.jfif,.pdf,.docx"
                          multiple
                          maxFileSize={2000000}
                          chooseLabel="Joindre"
                          uploadOptions={{ className: "hidden" }}
                          cancelOptions={{ className: "hidden" }}
                        />
                      </div>
                    </div>
                  </form>

                  {/* Buttons */}
                  <div className="flex justify-content-between center_media mt-2">
                    <div>
                      <Button
                        type="button"
                        className="p-button-danger"
                        onClick={() => setShowFormUpdate(false)}
                        label="Fermer"
                      />
                    </div>
                    <div>
                      <Button
                        className="p-button-success"
                        label=" Valider "
                        onClick={() => setVisible(false)}
                      />
                    </div>
                  </div>
                </Fieldset>
              </Dialog>
            </>
        }
        {/* <div className="p-fluid formgrid grid mt-4"> */}
      </div>
      <div className="flex">
        <Fieldset className="mt-3" style={{ width: '20%', height: '140px' }} legend="Status de l'étape">
          <form>
            <div className="p-fluid formgrid grid">
              <div className="flex justify-content-center">
                <SelectButton value={btnStatus} onChange={(e) => {
                  setBtnStatus(e.value);
                  console.log(e.value);
                  handleStatus();
                }}
                  options={options} itemTemplate={justifyTemplate} />
              </div>

            </div>
          </form>
        </Fieldset>
        <Fieldset className="mt-3" style={{ width: '80%', height: '140px' }} legend="Action requise">
          <form>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-8">
                <InputText
                  id="nom"
                  name="nom"
                  value={status.actionRequise}
                  placeholder="Action requise"
                  onChange={(e) =>
                    setStatus({
                      ...status,
                      actionRequise: e.target.value,
                    })
                  }
                />
              </div>
              <div className="field col-12 md:col-4">
                <Button label="envoyer au client" onClick={handleActionRequise} />
              </div>
            </div>
          </form>
        </Fieldset>
      </div>
    </>
  )
}