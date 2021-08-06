import { LightningElement ,track,api} from 'lwc';
import getClubList from '@salesforce/apex/assignStadium.getClubList';
import assignClub from '@salesforce/apex/assignStadium.assignClub';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const actions = [
    { label: 'Assign', name: 'assign' },
    { label: 'View', name: 'view' },
];

const columns = [
    { label: 'Stadium', fieldName: 'Building__c' },
    { label: 'Club', fieldName: 'Name' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class AssignBilding extends NavigationMixin(LightningElement) {

    @track openModal = false;
    @track data = [];
    @track datas = [];

    columns = columns;
    record = {};
    @api objectApiName;
    @api recordId;
    @track currenObjectName;
    @track currenRecordId;
    @track allSelectedRow=[];
    @track allSelectedRowsClub=[];
    error;

    //-----connected callback functionality
    connectedCallback() {
        this.currenRecordId = this.recordId;
        this.currenObjectName = this.objectApiName;
        console.log("recordId:"+this.currenRecordId);

        //get Data from apex class
        getClubList({SelectedId:this.currenRecordId})
        .then(result => {
            this.data = result;
            })
            .catch(error => {
                this.error = error;
                });

    }

    //----Assign and detail page natigatiob functionality
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log("row data:"+JSON.stringify(row));

        switch (actionName) {
            case 'assign':
                this.assignRow(row);
                break;
            case 'view':
                this.navigateToRecordPage(row);
                break;
            default:
        }
    }

    //-----assignment functionality
    assignRow(currentRow){
        this.allSelectedRow=[];
        const selectedRow = currentRow;

        //SENDING selected row id to apex class method
        assignClub({rowId:selectedRow.Id})
        .then(results => {
            this.datas = results;
            console.log("this.dataS:"+this.datas);
            })
            .catch(error => {
                this.error = error;
                });
      
                this.showSuccessToast();

                this.openModal = false;
                window.location.reload();
    }

    showSuccessToast() {
        const evt = new ShowToastEvent({
            title: 'Record Update',
            message: 'Record Updated successfully ',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }


    //-------Navigation functionality
    navigateToRecordPage(rowData) {
        const Ids = rowData;
        console.log("Ids:"+Ids.Id);

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: Ids.Id,
                actionName: 'view'
            }
        });
}


    //--------- modal functionality
    showModal() {
        this.openModal = true;
    }
    closeModal() {
        this.openModal = false;
    }
}