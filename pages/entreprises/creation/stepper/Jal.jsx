import { Editor } from "primereact/editor";
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from "primereact/inputtext";
//pdf lib
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { Fieldset } from "primereact/fieldset";
import { useReactToPrint } from "react-to-print";
import GetFiles from "../components/GetFiles";

export default function Jal(props) {
  const [text, setText] = useState(`<div class="ql-editor" data-gramm="false" contenteditable="true"><p class="ql-align-center"><strong>«…………………….» SARL </strong></p><p><br></p><p><strong><u>Objet&nbsp;:</u> </strong>Annonce Légale<strong> </strong></p><p><br></p><p><strong>Monsieur&nbsp;;</strong></p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Prière d’insérer l’annonce légale conformément au texte ci-dessous&nbsp;:</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong>A</strong>ux termes d’un acte sous seing privé en date du <strong>…………………. à ……………………………….</strong>, il a été constitué une société S.A.R.L ayant les caractéristiques suivantes:</p><p class="ql-align-center"><br></p><p>1)<u> LA DENOMINATION :</u>&nbsp;<strong><u>«……………………………..» SARL </u></strong></p><p>2)<u> SIEGE SOCIAL:&nbsp;</u><strong>……………………………………………………………………………………………………………</strong></p><p>3)<u> L’OBJET SOCIAL&nbsp;:</u><strong> La société a pour objet.</strong></p><p>…………………………………………………………………………………………………………………………………<strong>.</strong></p><p>4) <u>CAPITAL SOCIAL</u>&nbsp;: fixé à la somme <strong>…………………………… (…………,00dhs)</strong> divisé en <strong>………………parts de 100 Dirhams</strong> chacune, attribuées à l'associé en fonction de ses apports à savoir :</p><p>……………………………<strong>. ……………. parts </strong></p><p>……………………………<strong>. .………….. parts </strong></p><p><strong>Total ..………….. parts </strong></p><p><br></p><p><u>5) LA GERANCE&nbsp;:</u></p><p>La société est gérée et administrée par&nbsp;:<strong> ………………………………….., il est </strong>nommé gérant pour une durée illimitée.</p><p><br></p><p class="ql-align-justify"><u>6) LA DUREE</u>&nbsp;: <strong>99 </strong>années à compter du jour de sa constitution définitive. </p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong>L</strong>e dépôt légal a été effectué au tribunal du commerce de <strong>CASABLANCA</strong>. (R.C N°……………………..<strong>). </strong> </p><p class="ql-align-justify">Pour extrait et mention.</p><p class="ql-align-justify"><br></p><h1 class="ql-align-justify"><br></h1><h1 class="ql-align-justify"><br></h1><h1 class="ql-align-justify"><br></h1><h1 class="ql-align-right"><u>La Direction</u></h1><p><br></p></div>`);
  const [pdfBytes, setPdfBytes] = useState(null);
  const [journalNot, setJournalNot] = useState();
  const options = [{ icon: 'pi pi-clock', value: "En cours" }, { icon: 'pi pi-check', value: "Validé" }, { icon: 'pi pi-check', value: "pret" }];
  const [value, setValue] = useState(options[0]);
  const [btnStatus, setBtnStatus] = useState(options[0]);
  const [status, setStatus] = useState({
    status: "",
    actionRequise: ""
  });
  // const handlePrint = () => {
  //   // const contentToPrint = text; // Adjust this based on your editor library
  //   const dataHTML = `
  //     <html>
  //       <head>
  //         <meta charset="UTF-8">
  //       </head>
  //       <body onload="window.print();window.close()">
  //         ${text}
  //       </body> 
  //     </html>
  //   `;
  //   const printWindow = window.open(
  //     '',
  //     '',
  //     'height=800, width=1200,toolbar=0, menubar=0, scrollbars=1, resizable=1,status=0, location=0, left=10, top=10'
  //   );
  //   // const printWindow = window.open('', '');
  //   printWindow.document.open();
  //   printWindow.document.write(dataHTML);
  //   printWindow.document.close();
  //   return true;
  // };
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
  const componentRef = React.useRef(null);
  const reactToPrintContent = React.useCallback(() => {
    console.log(componentRef.current.getContent());
    return componentRef.current.getContent();
  }, [componentRef.current]);
  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true
  });
  // const handlePrint = ()=>{
  //   console.log(componentRef.current.getContent())
  // }
  // async function fillForm() {
  //   const formUrl = '../pdfs/Journal annonce legale(formfill).pdf';
  //   const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

  //   const marioUrl = 'https://pdf-lib.js.org/assets/small_mario.png'
  //   const marioImageBytes = await fetch(marioUrl).then(res => res.arrayBuffer())

  //   const emblemUrl = 'https://pdf-lib.js.org/assets/mario_emblem.png'
  //   const emblemImageBytes = await fetch(emblemUrl).then(res => res.arrayBuffer())

  //   const pdfDoc = await PDFDocument.load(formPdfBytes)

  //   const marioImage = await pdfDoc.embedPng(marioImageBytes)
  //   const emblemImage = await pdfDoc.embedPng(emblemImageBytes)

  //   const form = pdfDoc.getForm()

  //   const field1 = form.getTextField('field1')


  //   field1.setText('Mario')

  //   const pdfBytes = await pdfDoc.save()
  //   // download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");\
  //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //   window.open(URL.createObjectURL(blob));

  // }
  // useEffect(() => {

  //   const generatePDF = async () => {
  //     const formUrl = '../pdfs/Journal annonce legale(formfill).pdf';
  //     const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
  //     const pdfDoc = await PDFDocument.load(formPdfBytes)
  //     const form = pdfDoc.getForm()
  //     const field1 = form.getTextField('field1')
  //     field1.setText('Mario')
  //     const pdfBytes = await pdfDoc.save()
  //     setPdfBytes(pdfBytes);
  //   }
  //   generatePDF()
  // }, [])
  // const renderPDF = () => {
  //   if (typeof window !== 'undefined') {
  //     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //     const dataUrl = URL.createObjectURL(blob);

  //     return (
  //       <iframe
  //         src={dataUrl}
  //         // src={'../pdfs/rc1.pdf'}
  //         title="PDF Viewer"
  //         width="100%"
  //         height="500px"
  //       >
  //       </iframe>
  //     )
  //   }
  // }
  // const onGeneratePDF = async () => {
  //   fillForm();
  // };
  return (
    <>
      <div className="p-fluid formgrid grid">
        <div className="field col-12 md:col-12">
          <p>document journal d annoce legal :</p>
          {/* <div style={{ height: "500px" }}>{renderPDF()}</div> */}
          <Editor ref={componentRef} value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
        </div>
        <div className="field col-12 md:col-3">
          <Button
            type="button"
            severity="primary"
            label="envoyer le document"
          />
        </div>
        <div className="field col-12 md:col-3">
          <Button
            type="button"
            label="print"
            severity='secondary'
            onClick={handlePrint}
          />
        </div>
      </div>
    <GetFiles companyId={props.companyId} step={props.current_step}/>

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