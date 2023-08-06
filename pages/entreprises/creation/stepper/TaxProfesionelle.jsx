import { Editor } from "primereact/editor";
import { SelectButton } from 'primereact/selectbutton';
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
//pdf lib
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { Fieldset } from "primereact/fieldset";
import GetFiles from "../components/GetFiles";

export default function TaxProfesionelle(props) {
  const [text, setText] = useState(`<div class="ql-editor" data-gramm="false" contenteditable="true"><p>Identification du demandeur Nom et prénom ou raison sociale: …………………………………………………………………………………………………………………………………………… Lieu d’activité : …………………………………………………………………………………………………………………………………………………………………… Domicile fiscal ou siège social : ……………………………………………………………………………………………………………………………………………… Activité : ……………………………………………………………………………………………………………………………………………………………………………… Date de début d’activité : /__/__/- /__/__/-/__/__/__/__/ N° du Registre de commerce (RC) : ……………… ville du RC: …………………… C N I ou carte de séjour n° : /__/__/__/__/__/__/__/__/ N° d’identification à la TP : /__/__/__/__/__/__/__/__/ Tél. : …………………………………………… Fax : ……………………………… E-mail : ………………………………………………………………………………… Objet de la demande - Création d’une personne physique ou morale - Autre - préciser l’objet : ………………………………………………………………………………………………………………………………………… Pièces à joindre Personne physique ou morale déjà créée Le formulaire de la demande servi, daté et signé. Nouvelle personne physique - Une copie du contrat de bail légalisé et enregistré ; - Ou une copie du reçu de loyer légalisé par le propriétaire ; - Ou une copie du titre de propriété (Immeuble, droit au bail ou fonds de commerce) ; - Ou une copie de l’acte de domiciliation légalisé* ; - Une copie de la CNI ou de la carte de séjour ; - Une copie de l’autorisation nécessaire à l’exercice de l’activité (si l’activité est réglementée). Nouvelle Personne morale Cas des Sociétés Anonymes (SA) Cas des Sociétés à Responsabilité Limitée (SARL) Cas des sociétés en nom collectif et les sociétés en commandite - Une copie du contrat de bail légalisé et enregistré ; - Ou une copie du reçu de loyer légalisé par le propriétaire ; - Ou une copie du titre de propriété (Immeuble, droit au bail ou fonds de commerce) ; - Ou une copie de l’acte de domiciliation légalisé* ; - Une copie des statuts enregistrés ; - Une copie de la CNI, de la carte de séjour, du passeport ou du registre de commerce (RC) de l’administrateur ou l’équivalent du RC traduit le cas échéant pour les personnes morales non résidentes ; - Une copie de l’autorisation nécessaire à l’exercice de l’activité (si l’activité est réglementée) ; - Une copie du procès verbal de nomination du gérant s’il n’est pas nommé dans les statuts (pour les SARL). Modèle AAC050F-13I Demande d’attestation d’inscription à la taxe professionnelle (TP) DR/ DP ou DIP de : ………………………..…………....… Subdivision de :…………….………. Date de dépôt : …………………..… N° de dépôt: ……… Cas des coopératives Cas des organismes de placement collectif en valeurs mobilières "OPCVM" Cas des sociétés mutualistes - Une copie de la décision d'agrément telle que publiée au bulletin officiel ; - Une copie des statuts enregistrés ; - Une copie de la CNI du président ; - Une copie du contrat de bail légalisé et enregistré ; - Ou une copie du reçu de loyer légalisé par le propriétaire; - Ou une copie du titre de propriété (immeuble, droit au bail ou fonds de commerce) ; - Ou une copie de l’acte de domiciliation légalisé*. - Une copie du règlement de gestion (fonds commun de placement) ou des statuts enregistrés (société d’investissement à capital variable) ; - Une copie de l’acte d’agrément délivré par le conseil déontologique des valeurs mobilières (CDVM) ; - Une copie du contrat de bail légalisé et enregistré ; - Ou une copie du reçu de loyer légalisé par le propriétaire ; - Ou une copie du titre de propriété (immeuble, droit au bail ou fonds de commerce) ; - Ou une copie de l’acte de domiciliation légalisé*. - Une copie du contrat de bail légalisé et enregistré ; - Ou une copie du reçu de loyer légalisé par le propriétaire ; - Ou une copie du titre de propriété (Immeuble, droit au bail ou fonds de commerce) ; - Ou une copie de l’acte de domiciliation légalisé* ; - Une copie des statuts enregistrés ; - Une copie de l’arrêté conjoint du ministre délégué au travail et aux affaires sociales et du ministre des finances ; - Une copie de la CNI du président du conseil d’administration de la société mutualiste. Cas des Groupements d’Intérêt Economique « GIE » Cas des établissements stables Cas des sociétés concessionnaires de service public - Une copie du contrat de groupement ; - Une copie de la CNI de l’administrateur du GIE ; - Une copie du contrat de bail légalisé et enregistré ; - Ou une copie du reçu de loyer légalisé par le propriétaire; - Ou une copie du titre de propriété (Immeuble, droit au bail ou fonds de commerce) ; - Ou une copie de l’acte de domiciliation légalisé*. - Une copie du contrat de bail ou d’acquisition enregistré et légalisé ; - Ou une copie de l’acte de domiciliation légalisé* ; - Une copie des statuts de la société mère, traduits le cas échéant ; - Une copie du PV de création de l'établissement stable ; - Une copie du marché ; - Une copie de la CNI, du passeport ou de la carte de séjour du représentant de l'établissement. - Une copie des statuts enregistrés ; - Une copie du contrat de concession ; - Une copie du contrat de bail légalisé et enregistré ; - Ou une copie du reçu de loyer légalisé par le propriétaire ; - Ou une copie du titre de propriété (immeuble, droit au bail ou fonds de commerce) ; - Ou une copie de l’acte de domiciliation légalisé*. Cas des fonds créés par voie législative ou réglementaire Cas des sociétés exploitant les centres de gestion de comptabilité agréée - Une copie de l’acte de création du fonds. - Une copie des statuts enregistrés ; - Une copie de l’agrément. A ………………………………… Le ……………… Qualité du signataire : …………………………………………………………… Signature : NB : - Pour les sociétés de fait, il faut produire toute pièce désignant l’associé principal. - Pour les autres formes juridiques d’entreprises, veuillez contacter le bureau d’accueil et de coordination. RAPPEL : - La déclaration d’existence (Modèle ADM050 pour les personnes morales et modèle ADP050 pour les personnes physiques) doit être souscrite dans un délai maximum de trente (30) jours suivant la date : - soit de leur constitution, s’il s’agit d’une société de droit marocain ou de leur installation, s’il s’agit d’une entreprise non résidente ; - soit du début de l’activité, s’il s’agit de contribuables personnes physiques ou groupements de personnes physiques, ayant des revenus professionnels. - La déclaration d’inscription au rôle de la Taxe Professionnelle (Modèle ADC061F) doit être souscrite dans un délai maximum de trente (30) jours suivant la date du début d’activité. * l’acte de domiciliation doit être établi par le propriétaire de l’immeuble ou du fonds de commerce ou bien par une personne inscrite aux rôles de la taxe professionnelle et qui ne soit pas elle-même domiciliée. L’acte de domiciliation doit mentionner les dispositions de l’article 93 du code de recouvrement des créances publiques.&nbsp;</p></div>`);
  // <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
  const [taxNot, setTaxNot] = useState();
  const [pdfBytes, setPdfBytes] = useState(null);
  const [DataFormUpdate, setDataFormUpdate] = useState({
    tp: ""
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
    const formUrl = '../pdfs/Tax Profesionelle(formfill).pdf';
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())


    const pdfDoc = await PDFDocument.load(formPdfBytes)

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
      const formUrl = '../pdfs/Tax Profesionelle(formfill).pdf';
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
            value={DataFormUpdate.tp}
            placeholder='numero tp'
            onChange={(e) =>
              setDataFormUpdate({
                ...DataFormUpdate,
                tp: e.target.value,
              })
            }
          />
        </div>
        <div className="field col-12 md:col-2">
          <Button label="save" onClick={() => handleSubmitAdresse('bail')} />
        </div>
        <div className="field col-12 md:col-12">
          <p>document tax profesionelle :</p>
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