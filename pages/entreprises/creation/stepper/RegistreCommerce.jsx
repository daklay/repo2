import { useEffect, useRef, useState } from "react";
// import rc1 from '../pdfs/rc1.pdf'
import { Button } from "primereact/button";
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from "primereact/inputtext";
//pdf lib
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { Fieldset } from "primereact/fieldset";
import GetFiles from "../components/GetFiles";
import Status from "../components/Status";
import axios from '../../../api/axios';

export default function RegistreCommerce(props) {
  const [registreNot, setRegistreNot] = useState();
  const [pdfBytes, setPdfBytes] = useState(null);
  const currentDate = new Date().toLocaleDateString();
  const [DataFormUpdate, setDataFormUpdate] = useState({
    rc: "",
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
    const formUrl = '../pdfs/RC.pdf';
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
    const getCompanyInfo = async () => {
      const response = await axios.get(`/company/get_company/${props.companyId}`);

      const generatePDF = async () => {
        const formUrl = '../pdfs/RC.pdf';
        const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
        const pdfDoc = await PDFDocument.load(formPdfBytes)
        const form = pdfDoc.getForm()
        const field1 = form.getTextField('field1')
        const field2 = form.getTextField('field2')
        const field3 = form.getTextField('field3')
        const field4 = form.getTextField('field4')
        const field5 = form.getTextField('field5')
        const field6 = form.getTextField('field6')
        const field7 = form.getTextField('field7')
        const field8 = form.getTextField('field8')
        const field9 = form.getTextField('field9')
        const field10 = form.getTextField('field10')
        const field11 = form.getTextField('field11')
        const field12 = form.getTextField('field12')
        const field13 = form.getTextField('field13')
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
        const field24 = form.getTextField('field24')
        const field25 = form.getTextField('field25')
        const field26 = form.getTextField('field26')
        const field27 = form.getTextField('field27')
        const field28 = form.getTextField('field28')
        const field29 = form.getTextField('field29')
        const field30 = form.getTextField('field30')
        const field31 = form.getTextField('field31')
        const field32 = form.getTextField('field32')
        const field33 = form.getTextField('field33')
        const field34 = form.getTextField('field34')
        const field35 = form.getTextField('field35')
        const field36 = form.getTextField('field36')
        const field37 = form.getTextField('field37')
        const field38 = form.getTextField('field38')
        const field39 = form.getTextField('field39')
        const field40 = form.getTextField('field40')
        const field41 = form.getTextField('field41')
        const field42 = form.getTextField('field42')
        const field43 = form.getTextField('field43')
        const field44 = form.getTextField('field44')
        const field45 = form.getTextField('field45')
        const field46 = form.getTextField('field46')
        const field47 = form.getTextField('field47')
        const field48 = form.getTextField('field48')
        const field49 = form.getTextField('field49')
        const field50 = form.getTextField('field49')//forme juridrique
        field1.setText(response.data?.name)
        // field2.setText('Mario')
        // field3.setText('Mario')
        field4.setText(response.data.certificatNegatif.date.split('T')[0])
        // field5.setText('Mario')
        field6.setText('Mario')
        field7.setText('Mario')
        field8.setText(response.data.contract.contratDeBail?.adresse || response.data.contract.domiciliation?.adresse || '')
        // field9.setText('Mario')
        // field10.setText('Mario')
        // field11.setText('Mario')
        // field12.setText('Mario')
        // field13.setText('Mario')
        // field14.setText('Mario')
        field15.setText('Mario')
        field16.setText('Mario')
        field17.setText('Mario')
        field18.setText('Mario')
        field19.setText('Mario')
        field20.setText('Mario')
        field21.setText('Mario')
        field22.setText('Mario')
        field23.setText('Mario')
        field24.setText('Mario')
        field25.setText('Mario')
        field26.setText('Mario')
        field27.setText('Mario')
        field28.setText('Mario')
        field29.setText('Mario')
        field30.setText('Mario')
        field31.setText('Mario')
        field32.setText('Mario')
        field33.setText('Mario')
        field34.setText('Mario')
        field35.setText('Mario')
        field36.setText('Mario')
        field37.setText('Mario')
        field38.setText('Mario')
        field39.setText('Mario')
        field40.setText('Mario')
        field41.setText('Mario')
        field42.setText('Mario')
        field43.setText('Mario')
        field44.setText('Mario')
        field45.setText('Mario')
        field46.setText('Mario')
        field47.setText('Mario')
        field48.setText('Mario')
        field49.setText('Mario')
        const pdfBytes = await pdfDoc.save()
        setPdfBytes(pdfBytes);
      }
      generatePDF()

    }
    if (props.companyId) {
      getCompanyInfo();
    }
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
    fillForm();
  };
  return (<>
    <div className="p-fluid formgrid grid">
      <div className="field col-12 md:col-10">
        {/* <label htmlFor="">Numero rc</label> */}
        <InputText
          name="date_debut"
          value={DataFormUpdate.rc}
          placeholder='numero rc'
          onChange={(e) =>
            setDataFormUpdate({
              ...DataFormUpdate,
              rc: e.target.value,
            })
          }
        />
      </div>
      <div className="field col-12 md:col-2">
        <Button label="save" onClick={() => handleSubmitAdresse('bail')} />
      </div>
      <div className="field col-12 md:col-12">
        <p>document rc :</p>
        <div style={{ height: "500px" }}>{renderPDF()}</div>
      </div>
      <div className="field col-12 md:col-3">
        <Button
          type="button"
          className="p-button-success"
          label="envoyer le document"
        />
      </div>
      {/* <div className="p-fluid formgrid grid mt-4"> */}
      {/* </div> */}
    </div>
    <GetFiles companyId={props.companyId} step={props.current_step} />
    <Status endpoint={`stepper/commerce/${props.companyId}`} companyId={props.companyId} current_step={props.current_step} />
  </>
  )
}