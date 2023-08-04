import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../../data/ProductService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";

const EmptyPage = () => {
  const [text, setText] = useState("test");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    { name: "Fiscalité" },
    { name: "Comptabilité" },
    { name: "Législation" },
    { name: "News" },
    { name: "autre" },
  ];

  let emptyProduct = {
    id: "",
    type: "",
    titre: "",
    description: "",
    contenu: "",
    mot_cles: "",
    category: "",
    createdAt: "11/1/2002",
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    ProductService.getProducts().then((data) => setProducts(data));
  }, []);

  // const formatCurrency = (value) => {
  //   return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  // };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.titre.trim()) {
      let _products = [...products];
      let _product = { ...product };

      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  // const exportCSV = () => {
  //   dt.current.exportCSV();
  // };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  // const onCategoryChange = (e) => {
  //   let _product = { ...product };

  //   _product['category'] = e.value;
  //   setProduct(_product);
  // };

  const onCategoryChange = (e) => {
    (e) => setSelectedCategory(e.value);
    let _product = { ...product };

    _product["category"] = e.value.name;
    setProduct(_product);
  };

  const onTypeChange = (e) => {
    let _product = { ...product };

    _product["type"] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  // const onInputNumberChange = (e, name) => {
  //   const val = e.value || 0;
  //   let _product = { ...product };

  //   _product[`${name}`] = val;

  //   setProduct(_product);
  // };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Ajouter un contenu"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Suprimer"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </div>
    );
  };

  // const rightToolbarTemplate = () => {
  //   return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
  // };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
        alt={rowData.image}
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
    );
  };

  // const priceBodyTemplate = (rowData) => {
  //   return formatCurrency(rowData.price);
  // };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  // const statusBodyTemplate = (rowData) => {
  //   return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
  // };

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

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Articles</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div className="grid">
      <div className="col-12">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

          <DataTable
            ref={dt}
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            header={header}
          >
            <Column selectionMode="multiple" exportable={false}></Column>
            <Column
              field="type"
              header="Type"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="titre"
              header="Titre"
              sortable
              style={{ minWidth: "16rem" }}
            ></Column>
            {/* <Column field="image" header="Image" body={imageBodyTemplate}></Column> */}
            <Column
              field="mot_cles"
              header="Mot cles"
              sortable
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="category"
              header="Category"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
            <Column
              field="createdAt"
              header="Date de creation"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={productDialog}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Article details"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          {product.image && (
            <img
              src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
              alt={product.image}
              className="product-image block m-auto pb-3"
            />
          )}
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Titre
            </label>
            <InputText
              id="name"
              value={product.titre}
              onChange={(e) => onInputChange(e, "titre")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.titre,
              })}
            />
            {submitted && !product.titre && (
              <small className="p-error">Name is required.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <InputTextarea
              id="description"
              value={product.description}
              onChange={(e) => onInputChange(e, "description")}
              required
              rows={3}
              cols={20}
            />
          </div>

          <div className="field">
            {/* <label htmlFor="description" className="font-bold">
              Contenu
            </label>
            <InputTextarea id="description" value={product.contenu} onChange={(e) => onInputChange(e, 'contenu')} required rows={3} cols={20} /> */}
            <div className="field col-12 md:col-12">
              <p>document Identifiant Fiscale :</p>
              <Editor
                value={text}
                onTextChange={(e) => setText(e.htmlValue)}
                style={{ height: "320px" }}
              />
            </div>
          </div>

          <div className="field">
            <label className="mb-3 font-bold">Type</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="type1"
                  name="type"
                  value="type1"
                  onChange={onTypeChange}
                  checked={product.type === "type1"}
                />
                <label htmlFor="type1">article</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="type2"
                  name="type"
                  value="type2"
                  onChange={onTypeChange}
                  checked={product.type === "type2"}
                />
                <label htmlFor="type2">vidéo</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="type3"
                  name="type"
                  value="type3"
                  onChange={onTypeChange}
                  checked={product.type === "type3"}
                />
                <label htmlFor="type3">blog</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="type4"
                  name="type"
                  value="type4"
                  onChange={onTypeChange}
                  checked={product.type === "type4"}
                />
                <label htmlFor="type4">poste</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="type4"
                  name="type"
                  value="type4"
                  onChange={onTypeChange}
                  checked={product.type === "type4"}
                />
                <label htmlFor="type4">infographics</label>
              </div>
            </div>
          </div>
          {/* <div className="field">
            <label className="mb-3 font-bold">Category</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton inputId="category1" name="category" value="categorie1" onChange={onCategoryChange} checked={product.category === 'categorie1'} />
                <label htmlFor="category1">categorie1</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton inputId="category2" name="category" value="category2" onChange={onCategoryChange} checked={product.category === 'category2'} />
                <label htmlFor="category2">categorie2</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton inputId="category3" name="category" value="category3" onChange={onCategoryChange} checked={product.category === 'category3'} />
                <label htmlFor="category3">categorie3</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton inputId="category4" name="category" value="category4" onChange={onCategoryChange} checked={product.category === 'category4'} />
                <label htmlFor="category4">categorie4</label>
              </div>
            </div>
          </div> */}

          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="price" className="font-bold">
                Mot cles <span>(max:4)</span>
              </label>
              <InputText
                id="mot_cles"
                value={product.mot_cles}
                onChange={(e) => onInputChange(e, "mot_cles")}
              />
            </div>
            <div className="field col">
              <label htmlFor="quantity" className="font-bold">
                Category
              </label>
              <Dropdown
                value={selectedCategory}
                onChange={onCategoryChange}
                options={categories}
                optionLabel="name"
                placeholder="Select a categorie"
                className="w-full md:w-14rem"
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          visible={deleteProductDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Are you sure you want to delete <b>{product.name}</b>?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteProductsDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteProductsDialogFooter}
          onHide={hideDeleteProductsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Are you sure you want to delete the selected products?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyPage;
