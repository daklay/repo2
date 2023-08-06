import { FileUpload } from "primereact/fileupload";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import axios from '../../../api/axios';

export default function Denomination(props) {
  const options = [{ icon: 'pi pi-clock', value: "En cours" }, { icon: 'pi pi-check', value: "Validé" }, { icon: 'pi pi-check', value: "pret" }];
  const [btnStatus, setBtnStatus] = useState(options[0]);
  const [fileUpload, setFileUpload] = useState();
  const [owner, setOwner] = useState(null);
  const [users, setUsers] = useState([]);
  const [FormUpdate, setFormUpdate] = useState({
    nom: "",
    prenom: "",
    civilite: "",
    country: "",
    email: "",
    telephone: "+212",
    date: "",
    nationalite: "",
    ville: "",
    code_postal: "",
    nature_service: "",
    adresse: "",
    nature_activite: "",
    identite: "",
    numeroPiece: "",
    PieceJointe: "",
    propositionDenomination: {
      prop1: "",
      prop2: "",
      prop3: ""
    },
    positionDemandeur: {
      select: "",
      input: ""
    },
  });
  const [status, setStatus] = useState({
    status: "",
    actionRequise: ""
  });
  const [StepperFormUpdate, setStepperFormUpdate] = useState({
    formeJuridrique: "",
    capital: "",
    pvGerance: "",
    adresse: ""
  });
  //########################## personne
  const [isSuperAdmin, setIsSuperAdmin] = useState(true);
  const [Affectation, setAffectation] = useState([]);
  const [affectedTo, setAffectedTo] = useState({});
  const [personneFormUpdate, setPersonneFormUpdate] = useState([{
    id: 1,
    user_type: "",
    first_name: "",
    last_name: "",
    share: "",
    birth_date: "",
    nationality: "",
    address: "",
    country:"",
    identity_type: "",
    identity_number: "",
  }]);
  const handlePersonneChange = (e, id) => {
    console.log('personid', id);
    const personToUpdate = personneFormUpdate.find(pers => pers.id == id);
    const updatedPersonneForms = [...personneFormUpdate];
    const indexToUpdate = updatedPersonneForms.findIndex(pers => pers.id === id);
    if(e.target.name == 'identity_type'){
      updatedPersonneForms[indexToUpdate] = { ...personToUpdate, [e.target.name]: e.target.value == "Cin" ? 'CI' :e.target.value == "Passport" ? 'PA' : 'SE'};
    }else{
      updatedPersonneForms[indexToUpdate] = { ...personToUpdate, [e.target.name]: e.target.value };
    }
    console.log(updatedPersonneForms);
    setPersonneFormUpdate(updatedPersonneForms)
  }
  const handleAddPerson = () => {
    const newPerson = { id: Date.now() };
    setPersonneFormUpdate([...personneFormUpdate, newPerson]);
  };
  const handleRemovePerson = (id) => {
    const updatedPersons = personneFormUpdate.filter((person) => person.id !== id);
    setPersonneFormUpdate(updatedPersons);
  };
  console.log(props.companyId);
  useEffect(() => {
    const getCompanyInfo = async () => {
      const response = await axios.get(`/company/get_company/${props.companyId}`);
      setFormUpdate(
        {
          ...FormUpdate,
          nom: response.data.user?.first_name,
          prenom: response.data.user?.last_name,
          civilite: response.data.user?.gender == 'H' ? 'homme' : 'femme',
          country: response.data.user?.country,
          email: response.data.user?.email,
          telephone: response.data.user?.phone,
          date: response.data.user?.birth_date,
          nationalite: response.data.user?.nationality,
          ville: response.data.user?.city,
          code_postal: response.data.user?.zip_code,
          nature_service: response.data.user?.service === "CR" ? 'creation' : response.data.user?.service === 'DO' ? 'domiciliation' : response.data.user?.service === 'CO' ? 'consultation' : 'autre',
          adresse: response.data.user?.adress,
          nature_activite: response.data.user?.activity == "BA" ? 'Banque / Assurance' : response.data.user?.activity == "BT" ? 'BTP / Materiaux de construction' : response.data.user?.activity == "EL" ? 'Electronique / Electricite' : response.data.user?.activity == "ET" ? 'Etudes et conseils' : response.data.user?.activity == "TR" ? 'Transports / Logistique' : response.data.user?.activity == "IN" ? 'Informatique / Telecoms' : 'autre',
          identite: response.data.user?.identity_type == "CI" ? 'Cin' : response.data.user?.identity_type == "PA" ? 'Passport' : 'Carte redisant',
          numeroPiece: response.data.user?.identity_number,
          PieceJointe: "",
          propositionDenomination: {
            prop1: response.data.name_one,
            prop2: response.data.name_two,
            prop3: response.data.name_three
          },
          positionDemandeur: {
            select: response.data.user?.userType,
            input: response.data.user?.userType !== 'associe' && response.data.user?.userType !== 'gerant' && response.data.user?.userType !== 'associe & gerant' ? response.data.user?.userType : ""
          },

        }
      )
      console.log(response);
    }
    if (props.companyId) {
      getCompanyInfo();
    }
    const getUsers = async () => {
      const response = await axios.get('auth/users');
      console.log(response);
      setUsers(response.data);
    }
    const getAffectation = async() => {
      const response = await axios.get('/affectation/get_affectations');
      setAffectation(response.data.data);
      console.log(response)
    }
    getUsers();
    getAffectation()
  }, [])
  //client ident
  const selectedUserTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div style={{ width: '110px' }}>{option.first_name}</div>
          <div style={{ width: '150px' }}>{option.phone}</div>
          <div>{option.email}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const userOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div style={{ width: '110px' }}>{option.first_name}</div>
        <div style={{ width: '150px' }}>{option.phone}</div>
        <div>{option.email}</div>
      </div>
    );
  };
  //client affectation
  const selectedAffectationTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div style={{ width: '110px' }}>{option.name}</div>
          <div style={{ width: '150px' }}>{option.city}</div>
          <div>{option.address}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const affectationOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div style={{ width: '110px' }}>{option.name}</div>
        <div style={{ width: '150px' }}>{option.city}</div>
        <div>{option.address}</div>
      </div>
    );
  };
  const handleSubmit = async () => {
    const data = {
      affectation:affectedTo.id,
      owner_id: owner.id,
      client: {
        email: FormUpdate.email,
        phone: FormUpdate.telephone,
        first_name: FormUpdate.nom,
        last_name: FormUpdate.prenom,
        adress: FormUpdate.adresse,
        city: FormUpdate.ville,
        country: FormUpdate.country,
        nationality: FormUpdate.nationalite,
        // zip_code: FormUpdate.code_postal,
        birth_date: FormUpdate.date,
        // description: 'asdf',
        service: "CR",
        activity: "ET",
        gender: "H",
        user_type: FormUpdate.positionDemandeur.select,
        identity_type: "PA",
        identity_number: FormUpdate.numeroPiece
      },
      company_names: {
        name_one: FormUpdate.propositionDenomination.prop1,
        name_two: FormUpdate.propositionDenomination.prop2,
        name_three: FormUpdate.propositionDenomination.prop3,
        description: 'sdfa'
      },
      users:personneFormUpdate,
      status: 'AP',
      formJuridique: StepperFormUpdate.formeJuridrique,
      capital: StepperFormUpdate.capital,
      address: StepperFormUpdate.adresse
    }
    console.log(data);
    const response = await axios.post('/company/create_company', data);
    if (response.data.company_id && fileUpload) {
      handleUpload(response.data.company_id);
    }else if(response.data.company_id){
      props.setCompanyId(response.data.company_id);
    }
    console.log(response)
    return response;
  }
  const handleStatus = async (action) => {
    const data = {
      status: btnStatus == "En cours" ? 'PE' : btnStatus == "Validé" ? "CO" : "AP",
      name_one: FormUpdate.propositionDenomination.prop1,
      name_two: FormUpdate.propositionDenomination.prop2,
      name_three: FormUpdate.propositionDenomination.prop3,
    };
    console.log(data)
    const response = await axios.put(`/company/update_company/${props.companyId}`, data);
    console.log(response)
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
  const handleUpload = async (company_id) => {
    const formData = new FormData();
    formData.append('file', fileUpload);
    formData.append('step', props.current_step);
    formData.append('file_type', 'ID');
    const response = await axios.post(`/filemanager/addFile/${company_id}`, formData);
    console.log(response);
  }
  const justifyTemplate = (option) => {
    return <i className={option.icon}></i>;
  }
  return (
    <>
      <Fieldset className="mb-3" legend="Client">
        <div className="p-fluid formgrid grid">
          <div className="field col-12 md:col-12">
            <label htmlFor="Civilite">Identification</label>
            <Dropdown
              id="Civilite"
              filter
              value={owner}
              valueTemplate={selectedUserTemplate}
              optionLabel="first_name"
              onChange={(e) => setOwner(e.target.value)}
              options={users}
              itemTemplate={userOptionTemplate}
              placeholder="sélectionner l'identité du client demandeur"
            />
          </div>
          {isSuperAdmin && <div className="field col-12 md:col-12">
            <label htmlFor="Civilite">affectation</label>
            <Dropdown
              id="Civilite"
              filter
              value={affectedTo}
              valueTemplate={selectedAffectationTemplate}
              optionLabel="first_name"
              onChange={(e) => setAffectedTo(e.target.value)}
              options={Affectation}
              itemTemplate={affectationOptionTemplate}
              placeholder="sélectionner l'affectation"
            />
          </div>}
        </div>
      </Fieldset>
      <Fieldset legend="Information de demandeur">
        <form>
          <div className="p-fluid formgrid grid">
            <div className="field col-12 md:col-6">
              <label htmlFor="nom">Nom: </label>
              <InputText
                id="nom"
                name="nom"
                value={FormUpdate.nom}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    nom: e.target.value,
                  })
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="prenom">Prénom: </label>
              <InputText
                id="prenom"
                name="prenom"
                value={FormUpdate.prenom}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    prenom: e.target.value,
                  })
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="Civilite">Civilité:</label>
              <Dropdown
                id="Civilite"
                value={FormUpdate.civilite}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    civilite: e.target.value,
                  })
                }
                options={['homme', 'femme']}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="email">Email: </label>
              <InputText
                id="email"
                name="email"
                value={FormUpdate.email}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="telephone">Téléphone: </label>
              <InputText
                id="telephone"
                name="telephone"
                value={FormUpdate.telephone}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    telephone: e.target.value,
                  })
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="date">Date de naissance: </label>
              <InputText
                id="date"
                type="date"
                name="date"
                value={FormUpdate.date}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    date: e.target.value,
                  })
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="nationalite">Nationalité</label>
              <Dropdown
                id="nationalite"
                value={FormUpdate.nationalite}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    nationalite: e.target.value,
                  })
                }
                options={['maroc', 'us']}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="adresse">Pays: </label>
              <InputText
                id="date"
                name="date"
                value={FormUpdate.country}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    country: e.target.value,
                  })
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="ville">Ville</label>
              <Dropdown
                id="ville"
                value={FormUpdate.ville}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    ville: e.target.value,
                  })
                }
                options={['maroc', 'us']}
              />
            </div>
            {/* <div className="field col-12 md:col-6">
              <label htmlFor="code postal">code postal: </label>
              <InputText
                id="date"
                name="date"
                value={FormUpdate.code_postal}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    code_postal: e.target.value,
                  })
                }
              />
            </div> */}
            <div className="field col-12 md:col-6">
              <label htmlFor="adresse">Adresse: </label>
              <InputText
                id="date"
                name="date"
                value={FormUpdate.adresse}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    adresse: e.target.value,
                  })
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="nature_service">Service demandé: </label>
              <Dropdown
                id="date"
                name="date"
                value={FormUpdate.nature_service}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    nature_service: e.target.value,
                  })
                }
                options={['creation', 'domiciliation', 'consultation', 'autre']}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="nature_activite">Nature d&apos;activité: </label>
              <Dropdown
                id="date"
                name="date"
                value={FormUpdate.nature_activite}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    nature_activite: e.target.value,
                  })
                }
                options={['Banque / Assurance', 'BTP / Materiaux de construction', 'Electronique / Electricite', 'Etudes et conseils', 'Transports / Logistique', 'Informatique / Telecoms']}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="position">position de demandeur: </label>
              <Dropdown
                id="date"
                name="select"
                value={FormUpdate.positionDemandeur.select}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    positionDemandeur: { ...FormUpdate.positionDemandeur, [e.target.name]: e.target.value }
                  })
                }
                options={['associe', 'gerant', 'associe & gerant', 'autre']}
              />
            </div>
            {FormUpdate.positionDemandeur.select == 'autre' && <div className="field col-12 md:col-6">
              <label htmlFor="position">autre: </label>
              <InputText
                id="date"
                name="input"
                value={FormUpdate.positionDemandeur.input}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    positionDemandeur: { ...FormUpdate.positionDemandeur, [e.target.name]: e.target.value }
                  })
                }
              />
            </div>}
          </div>
        </form>
      </Fieldset>
      <Fieldset className="mt-3" legend="Pièce jointe">
        <form>
          <div className="p-fluid formgrid grid">
            <div className="field col-12 md:col-6">
              <label htmlFor="identite">Pièce d&apos;identité: </label>
              <Dropdown
                id="date"
                name="date"
                value={FormUpdate.identite}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    identite: e.target.value,
                  })
                }
                options={['CIN', 'Passport', 'Carte résidant']}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="adresse">Numéro: </label>
              <InputText
                id="date"
                name="date"
                value={FormUpdate.numeroPiece}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    numeroPiece: e.target.value,
                  })
                }
              />
            </div>
            <div className="field col-12 md:col-12">
              <label>La pièce jointe:</label>
              <FileUpload
                name="demo[]"
                customUpload={true}
                uploadHandler={(e) => setFileUpload(e.files[0])}
                url={'/api/upload'}
                accept=".png,.jpg,.jpeg,.gif,.jfif,.pdf,.docx"
                multiple
                maxFileSize={2000000}
                chooseLabel="Joindre"
                // uploadOptions={{ className: "hidden" }}
                cancelOptions={{ className: "hidden" }}
              />
            </div>
          </div>
        </form>
      </Fieldset>
      <Fieldset className="mt-3">
        <form>
          <div className="p-fluid formgrid grid">
            <div className="field col-12 md:col-3">
              <label htmlFor="position">Forme Juridrique: </label>
              <Dropdown
                id="date"
                name="date"
                value={StepperFormUpdate.formeJuridrique}
                onChange={(e) =>
                  setStepperFormUpdate({
                    ...StepperFormUpdate,
                    formeJuridrique: e.target.value
                  })
                }
                options={['SA', 'SARL', 'SARL AU']}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="adresse">Capital: </label>
              <InputText
                id="date"
                name="date"
                value={StepperFormUpdate.capital}
                onChange={(e) =>
                  setStepperFormUpdate({
                    ...StepperFormUpdate,
                    capital: e.target.value,
                  })
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="adresse">adresse: </label>
              <InputText
                id="date"
                name="date"
                value={StepperFormUpdate.adresse}
                onChange={(e) =>
                  setStepperFormUpdate({
                    ...StepperFormUpdate,
                    adresse: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </form>
      </Fieldset>
      {personneFormUpdate.map(pers => (
        // <Personne key={pers.id} personneFormUpdate={personneFormUpdate} setPersonneFormUpdate={setPersonneFormUpdate} />
        <Fieldset key={pers.id} legend="Personne" className="mt-3">
          <form>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-3">
                <label htmlFor="position">Position: </label>
                <Dropdown
                  id="user_type"
                  name="user_type"
                  value={pers.user_type}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                  options={['associe', 'gerant', 'associe & gerant']}
                />
              </div>
              <div className="field col-12 md:col-3">
                <label htmlFor="adresse">nom: </label>
                <InputText
                  id="first_name"
                  name="first_name"
                  value={pers.first_name}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                />
              </div>
              <div className="field col-12 md:col-3">
                <label htmlFor="adresse">prenom: </label>
                <InputText
                  id="last_name"
                  name="last_name"
                  value={pers.last_name}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                />
              </div>
              <div className="field col-12 md:col-3">
                <label htmlFor="adresse">parts: </label>
                <InputText
                  id="parts"
                  name="share"
                  value={pers.share}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="adresse">Date naissance: </label>
                <InputText
                  id="date"
                  type="date"
                  name="birth_date"
                  value={pers.birth_date}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="position">Nationalité : </label>
                <Dropdown
                  id="nationality"
                  name="nationality"
                  value={pers.nationality}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                  options={['maroc', 'us']}
                />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="position">adresse : </label>
                <Dropdown
                  id="adresse"
                  name="adresse"
                  value={pers.adresse}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                  options={['casa', 'rabat']}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="position">Type piece d&apos;identité: </label>
                <Dropdown
                  id="identity_type"
                  name="identity_type"
                  value={pers.identity_type}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                  options={["Cin", "Passport", "Carte redisant"]}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="adresse">N° piece d&apos;identité: </label>
                <InputText
                  id="identity_number"
                  name="identity_number"
                  value={pers.identity_number}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                />
              </div>
            </div>
          </form>
        </Fieldset>
      ))}
      <div className="flex justify-content-end center_media mt-2">
        <div className="mr-3">
          <Button
            type="button"
            className="p-button-danger"
            onClick={() => handleAddPerson()}
            label="Ajouter Personne"
          />
        </div>
      </div>
      <Fieldset className="mt-3" legend="Proposition des noms">
        <form>
          <div className="p-fluid formgrid grid">

            <div className="field col-12 md:col-4">
              <InputText
                id="date"
                name="prop1"
                placeholder="proposition 1"
                value={FormUpdate.propositionDenomination.prop1}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    propositionDenomination: { ...FormUpdate.propositionDenomination, [e.target.name]: e.target.value }
                  })
                }
              />
            </div>
            <div className="field col-12 md:col-4">
              <InputText
                id="date"
                name="prop2"
                placeholder="proposition 2"
                value={FormUpdate.propositionDenomination.prop2}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    propositionDenomination: { ...FormUpdate.propositionDenomination, [e.target.name]: e.target.value }
                  })
                }
              />
            </div>
            <div className="field col-12 md:col-4">
              <InputText
                id="date"
                name="prop3"
                placeholder="proposition 3"
                value={FormUpdate.propositionDenomination.prop3}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    propositionDenomination: { ...FormUpdate.propositionDenomination, [e.target.name]: e.target.value }
                  })
                }
              />
            </div>
          </div>
        </form>
      </Fieldset>
      <div className="pl-1 pt-3">
        <Button label="Enregistrer" severity="success" onClick={handleSubmit} />
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