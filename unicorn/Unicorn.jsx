import React, { Component } from 'react';
import URLHelper from '../Helper/URLHelper';
import Modal from 'react-modal';
import FetchHelper from '../Helper/FetchHelper';
import UniForm from './UniForm';
import UniSearchInput from './UniSearchInput';
import SmartPagination from '../gen/SmartPagination';
import CsvExport from '../gen/CsvExport';
import UniFiche from './UniFiche';
class Unicorn extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        //    this.state = {inf:FetchHelper.getData(URLHelper.urlgen("api/Proformat_fournisseur_demande_ressource"))};
        this.listHisto();
    }
    getWriteableObject(listC) {
        let res = {};
        for (let index = 0; index < listC.length; index++) {
            const element = listC[index];
            if (element.writable)
                res[element.fieldName] = "";

        }
        return res;
    }
    getWriteableColumn(listC) {
        let res = [];
        for (let index = 0; index < listC.length; index++) {
            const element = listC[index];
            if (element.writable)
                res.push(element.fieldName);

        }
        return res;
    }
    getColumnName(listC) {
        let res = [];
        for (let index = 0; index < listC.length; index++) {
            const element = listC[index];
            // if(element.writable)
            res.push(element.fieldName);

        }
        return res;

    }
    listHisto = async () => {
        const val = await (FetchHelper.getData(URLHelper.urlgen(this.props.path + "/initCRUD")));
        if ("error" in val)
            window.location.replace("/")
        // console.log(val);
        console.log(JSON.stringify(val));
        let listC = val.data.infoClasse.listeChamp;
        let res = this.getWriteableObject(listC);
        this.setState({ champ: val.data.infoClasse, total: Math.ceil(val.data.liste / this.state.nb), formState: res });
        document.getElementById('searchButton').click();

    }
    openModal = () => {
        this.setState({ modalOpen: true });
    }
    closeModal = () => {
        this.setState({ modalOpen: false });
    }
    openFiche = () => {
        this.setState({ ficheOpen: true });
    }
    closeFiche = () => {
        this.setState({ ficheOpen: false });
    }
    handleInputChange = (event) => {
        console.log("niditra");
        const { name, value } = event.target;
        this.setState({ formState: { ...this.state.formState, [name]: value } });
    }
    plus = () => {
        if (this.state.pagepage !== (this.state.total / this.state.nb) + 1) {
            let nstate = this.state.page + 1
            this.setState({ page: nstate })

        }

    }
    minus = () => {
        if (this.state.pagepage !== 0) {
            let nstate = this.state.page - 1
            this.setState({ page: nstate })

        }
    }
    changePage = (page) => {
        this.state.page = page;
        this.handleSearchSubmit();
    }
    state = {
        search: false,
        modalOpen: false,
        ficheOpen: false,
        target: "CREATE",
        formState: {},
        ficheState: {},
        page: 1,
        nb: 4,
        total: 0,
        champ: {
            className: "",
            listeChamp: [
                {
                    fieldType: "",
                    inputType: "",
                    readable: false,
                    writable: false,
                    fieldName: "",
                    fieldLabel: "",
                    mainField: "nomModele",
                    possibleValue: [
                        {
                            id: 15,
                            idtype: 1,
                            idmarque: 1,
                            idmodele: "MOD001",
                            nomModele: "CX-5"
                        },
                        {
                            id: 2,
                            idtype: 1,
                            idmarque: 3,
                            idmodele: "MOD002",
                            nomModele: "ix35"
                        },
                    ]
                }
            ]
        },
        liste: [
        ]
    }
    getFieldByName(name) {
        let liste = this.state.champ.listeChamp;
        let res = {};
        liste.forEach(element => {
            console.log(element.fieldName + " " + name);
            if (element.fieldName === name) {
                res = element;
            }
        });
        return res;
    }
    getTitle() {
        let split = this.state.champ.className.split(".");
        let titre = split[split.length - 1];
        return <h2>{titre}</h2>
    }
    title() {
        let split = this.state.champ.className.split(".");
        let titre = split[split.length - 1];
        return titre;
    }
    getReadableColumn() {
        let listColumn = [];
        for (let index = 0; index < this.state.champ.listeChamp.length; index++) {
            const element = this.state.champ.listeChamp[index];
            if (element.readable && element.inputType !== "image" && element.inputType !== "ck")
                listColumn.push(element);

        }
        // console.log(listColumn);
        return listColumn;
    }

    getColumn() {
        let listColumn = this.getReadableColumn();
        return <tr>
            {listColumn.map(el => <th>{el.fieldLabel}</th>)}
            <th></th>
            <th></th>
        </tr>
    }
    checkFk(el, row) {
        if (el.possibleValue != null) {
            for (let index = 0; index < el.possibleValue.length; index++) {
                const element = el.possibleValue[index];
                if (element.id === row[el.fieldName])
                    return <td>{element[el.mainField]}</td>;

            }
        }
        if (el.fieldType === "date") {
            let date = new Date(row[el.fieldName]);
            return <td>{date.toLocaleDateString()}</td>
        }
        if (el.inputType === "ck")
            return <td></td>
        if (el.inputType === "image")
            return <td></td>
        return <td>
            {row[el.fieldName]}
        </td>
    }
    prepareUpdate = (id) => {
        this.setState({ target: "UPDATE" });
        for (let index = 0; index < this.state.liste.length; index++) {
            const element = this.state.liste[index];
            if (element.id === id) {
                let listC = this.getWriteableColumn(this.state.champ.listeChamp);
                this.state.formState.id = id;
                for (let i = 0; i < listC.length; i++) {
                    this.state.formState[listC[i]] = element[listC[i]];
                }
            }
        }
        this.openModal();
    }
    prepareRead = (id) => {
        // this.setState({target:"UPDATE"});
        for (let index = 0; index < this.state.liste.length; index++) {
            const element = this.state.liste[index];
            if (element.id === id) {
                let listC = this.getColumnName(this.state.champ.listeChamp);
                this.state.formState.id = id;
                for (let i = 0; i < listC.length; i++) {
                    this.state.ficheState[listC[i]] = element[listC[i]];
                }
            }
        }
        this.openFiche();
    }
    prepareInsert = () => {

        this.setState({ target: "INSERT" });
        let listC = this.getWriteableColumn(this.state.champ.listeChamp);

        this.state.formState.id = null;
        for (let i = 0; i < listC.length; i++) {
            this.state.formState[listC[i]] = "";
        }
        this.openModal();
    }
    insertCheck = () => {
        if (this.props.CUD != false)
            return <React.Fragment>
                <button className="btn btn-success" onClick={this.prepareInsert}>Inserer</button>
            </React.Fragment>
    }
    buttonCheck = (row) => {
        if (this.props.CUD != false)
            return <React.Fragment>
                <td style={{ width: "5%" }}><button type="button" class="btn btn-secondary" onClick={() => this.prepareRead(row.id)} >Read</button></td>
                <td style={{ width: "5%" }}><button type="button" class="btn btn-primary" onClick={() => this.prepareUpdate(row.id)} >Update</button></td>
                <td style={{ width: "5%" }}><button type="button" class="btn btn-danger" onClick={() => this.handleDelete(row.id)}>Delete</button></td>
            </React.Fragment>
    }
    renderRow(row, column) {

        return <tr>
            {column.map(el =>
                this.checkFk(el, row)
            )}
            {this.buttonCheck(row)}
        </tr>;
    }
    customStyles = {
        overlay: {
            background: "rgba(0,0,0,0.5)",
            overflowY: "scroll"
        },
        content: {
            top: '65%',
            left: '50%',
            right: '50%',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    async handleDelete(id) {
        const val = await (FetchHelper.getDataDelete(URLHelper.urlgen(this.props.path + ""), { id: id }));
        console.log(val);
        if ("data" in val) {
            window.location.reload();
        }
        else {
            alert(val.error.message);
        }
    }
    handleSearchSubmit = async (event) => {
        if (event !== undefined)
            event.preventDefault();

        let form = document.getElementById("searchform");
        let formData = new FormData(form);
        let object = {
            kv: [],
            kin: [],
            kiDates: [],
            kChoice: [],
            page: this.state.page,
            nb: this.state.nb,
        };
        if (this.props.spKv != null)
            object.kin.push(this.props.spKv)
        let o2 = [];
        formData.forEach((value, key) => o2.push({ key: key, value: value }));
        console.log(o2);

        let champs = this.state.champ.listeChamp;
        for (let index = 0; index < champs.length; index++) {
            const element = champs[index];
            // let toPut={};
            if (element.readable === false)
                continue
            if (element.inputType === "select") {
                for (let i2 = 0; i2 < o2.length; i2++) {
                    const e2 = o2[i2];
                    if (e2.value === "")
                        continue
                    // console.log(e2);
                    if (e2.key === element.fieldName) {
                        console.log(e2);
                        let tao = false;
                        for (let i3 = 0; i3 < object.kChoice.length; i3++) {
                            const e3 = object.kChoice[i3];
                            if (e3.key === e2.key) {
                                console.log("tao");
                                tao = true;
                                e3.tab.push(e2.value);
                            }
                        }
                        if (!tao) {
                            console.log("tsy tao");
                            object.kChoice.push({ key: e2.key, tab: [e2.value] });
                        }
                    }

                }
            }
            else if (element.inputType === "integer" || element.inputType === "float") {
                let crit = {
                    key: element.fieldName
                }
                for (let i2 = 0; i2 < o2.length; i2++) {
                    const e2 = o2[i2];
                    if (e2.value === "")
                        continue

                    if (e2.key === "min" + element.fieldName)
                        crit.min = Number.parseFloat(e2.value);
                    if (e2.key === "max" + element.fieldName)
                        crit.max = Number.parseFloat(e2.value);
                }
                if ("min" in crit || "max" in crit)
                    object.kin.push(crit)
            }
            else if (element.inputType === "date" || element.inputType === "datetime") {
                let crit = {
                    key: element.fieldName,
                }
                for (let i2 = 0; i2 < o2.length; i2++) {
                    const e2 = o2[i2];
                    console.log(e2);
                    if (e2.value === "")
                        break
                    if (e2.key === "min" + element.fieldName)
                        crit.min = e2.value
                    if (e2.key === "max" + element.fieldName)
                        crit.max = e2.value
                }
                if ("min" in crit || "max" in crit)
                    object.kiDates.push(crit)
            }
            else {
                for (let i2 = 0; i2 < o2.length; i2++) {
                    const e2 = o2[i2];
                    if (e2.value === "")
                        continue
                    if (e2.key === element.fieldName)
                        object.kv.push({ key: element.fieldName, value: e2.value })
                }
            }

        }
        console.log(object);


        let response = await FetchHelper.getDataPost(URLHelper.urlgen(this.props.path + "/search"), object);
        console.log(response);
        this.setState({ liste: response.data })
    }
    handleSubmit = async () => {
        let val = null;
        let form = this.state.formState;
        let champs = this.state.champ.listeChamp;
        // var base64=""
        for (let i = 0; i < champs.length; i++) {
            const element = champs[i];
            if (element.inputType === "image") {
                const fileInput = document.getElementById("sary" + element.fieldName);
                const file = fileInput.files[0];
                const reader = new FileReader();
                // console.log(reader.readAsDataURL(file));
                reader.onload = function (event) {
                    const base64String = event.target.result.split(",")[1];
                    let base64 = base64String;
                    form.numeroVehicule = base64
                    console.log(form);
                    // access form variable here
                };

                reader.readAsDataURL(file);
            }

        }
        // console.log(base64);


        if (this.state.target === "INSERT") {
            val = await FetchHelper.getDataPost(URLHelper.urlgen(this.props.path + ""), form);
        }
        else {
            let temp = {
                old: { id: form.id },
                brand: form
            }
            val = await FetchHelper.getDataPut(URLHelper.urlgen(this.props.path + ""), temp);
        }
        console.log(val);
        if ("data" in val) {
            window.location.reload();
        }
        else {
            alert(val.error.message);
        }

    }

    generalTextField = () => {
        return <div class="mb-3">
            <label for="" class="form-label">Rechercher</label>
            <input type="text"
                class="form-control" name="searchQ" id="" aria-describedby="helpId" placeholder="" />
        </div>
    }
    pageTotal = () => {
        let pg = this.state.total / this.state.nb
        if (this.state.total % this.state.nb !== 0) {
            pg = Math.floor(pg);
            pg++;
        }
        console.log("total: " + pg);
    }
    preparePdf = async () => {
        let res = await FetchHelper.getData(URLHelper.urlgen(this.props.path + "/pdf"));
        if ("data" in res)
            window.open(URLHelper.urlgen(res.data))

    }
    preparePdfOne = async (id) => {
        let res = await FetchHelper.getData(URLHelper.urlgen(this.props.path + "/pdf/" + id));
        if ("data" in res)
            window.open(URLHelper.urlgen(res.data))

    }

    render() {
        return (
            <div class="row">
                <div class="col-xl-2">
                    <form id="searchform">

                        {/* <UniSearchInput field={this.state.champ.listeChamp[0]} ></UniSearchInput> */}
                        {this.state.champ.listeChamp.map(field => <UniSearchInput field={field} ></UniSearchInput>)}
                        <button className="btn btn-primary" id='searchButton' onClick={this.handleSearchSubmit}>Rechercher</button>
                    </form>
                </div>

                <Modal
                    isOpen={this.state.modalOpen}
                    // onAfterOpen={afterOpenModal}
                    // onRequestClose={closeModal}
                    style={this.customStyles}
                    contentLabel="Example Modal"
                    class="modal-dialog modal-dialog-scrollable"
                // class="col-xl-5"
                >
                    {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                    <div class="row">
                        <UniForm fields={this.state.champ.listeChamp} formState={this.state.formState} oc={this.handleInputChange}></UniForm>
                        <button className='btn btn-outline-danger btn-sm' onClick={this.closeModal}>annuler</button>
                        <button className='btn btn-outline-success btn-sm' onClick={this.handleSubmit}>confirmer</button>
                    </div>

                </Modal>
                <Modal
                    isOpen={this.state.ficheOpen}
                    style={this.customStyles}
                >
                    <UniFiche fields={this.state.champ.listeChamp} formState={this.state.ficheState} ></UniFiche>

                    <button className='btn btn-outline-danger btn-sm' onClick={this.closeFiche}>retour</button>
                    <button className='btn btn-outline-primary btn-sm' onClick={() => this.preparePdfOne(this.state.ficheState.id)}>Telecharger pdf</button>

                </Modal>
                <div class="table-responsive col-xl-10">
                    <table class="table table-striped
                    table-hover	
                    table-borderless
                    table-primary
                    align-middle">
                        <thead class="table-light">
                            {this.getTitle()}
                            {this.insertCheck()}
                            <button className="btn btn-success" onClick={this.preparePdf}>Telecharger Pdf</button>
                            <CsvExport url={this.props.path} modele={this.title()}></CsvExport>

                            {this.getColumn()}
                        </thead>
                        <tbody class="table-group-divider">
                            {this.state.liste.map(element => this.renderRow(element, this.getReadableColumn()))}
                        </tbody>
                        <tfoot>
                            <SmartPagination
                                activePage={this.state.page}
                                totalPages={this.state.total}
                                onPageChange={this.changePage}
                                prevButtonLabel='<<'
                                nextButtonLabel='>>'
                                hideEllipsis={false}

                            ></SmartPagination>
                        </tfoot>
                    </table>
                </div>

            </div>
        );
    }
}

export default Unicorn;