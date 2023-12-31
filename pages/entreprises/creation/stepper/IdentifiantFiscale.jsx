import { Editor } from "primereact/editor";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from "primereact/inputtext";
//pdf lib
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { Fieldset } from "primereact/fieldset";
import GetFiles from "../components/GetFiles";
import Status from "../components/Status";

export default function IdentifiantFiscale(props) {
  const [identiteNot, setIdentiteNot] = useState();
  const [pdfBytes, setPdfBytes] = useState(null);
  const [DataFormUpdate, setDataFormUpdate] = useState({
    if: ""
  });
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

  async function fillForm() {
    const formUrl = '../pdfs/Identifiant fiscale(formfill).pdf';
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    const marioUrl = 'https://pdf-lib.js.org/assets/small_mario.png'
    const marioImageBytes = await fetch(marioUrl).then(res => res.arrayBuffer())

    const emblemUrl = 'https://pdf-lib.js.org/assets/mario_emblem.png'
    const emblemImageBytes = await fetch(emblemUrl).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(formPdfBytes)

    const marioImage = await pdfDoc.embedPng(marioImageBytes)
    const emblemImage = await pdfDoc.embedPng(emblemImageBytes)

    const form = pdfDoc.getForm()

    const field1 = form.getTextField('field1')


    field1.setText('Mario')

    const pdfBytes = await pdfDoc.save()
    // download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");\
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));

  }
  useEffect(() => {

    const generatePDF = async () => {
      const formUrl = '../pdfs/Identifiant fiscale(formfill).pdf';
      const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(formPdfBytes)
      const form = pdfDoc.getForm()
      const field1 = form.getTextField('field1')
      field1.setText('Mario')
      const pdfBytes = await pdfDoc.save()
      setPdfBytes(pdfBytes);
    }
    generatePDF()
  }, [])
  const renderPDF = () => {
    if (typeof window !== 'undefined') {
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
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
  const onGeneratePDF = async () => {
    fillForm()
  };
  return (
    <>
      <div className="p-fluid formgrid grid">
        <div className="field col-12 md:col-10">
          {/* <label htmlFor="">Numero rc</label> */}
          <InputText
            name="date_debut"
            value={DataFormUpdate.if}
            placeholder='numero IF'
            onChange={(e) =>
              setDataFormUpdate({
                ...DataFormUpdate,
                if: e.target.value,
              })
            }
          />
        </div>
        <div className="field col-12 md:col-2">
          <Button label="save" onClick={() => handleSubmitAdresse('bail')} />
        </div>
        <div className="field col-12 md:col-12">
          <p>document Identifiant Fiscale :</p>
          <div style={{ height: "500px" }}>{renderPDF()}</div>
        </div>
        <div className="field col-12 md:col-3">
          <Button
            type="button"
            className="p-button-success"
            label="envoyer le document"
          />
        </div>
      </div>
    <GetFiles companyId={props.companyId} step={props.current_step}/>
    <Status endpoint={`stepper/fiscale/${props.companyId}`} companyId={props.companyId} current_step={props.current_step}/>
    </>
  )
}