import { LightningElement,api,track } from 'lwc';
import getUnitBuilding from '@salesforce/apex/selectUnitBuilding.getUnitBuilding';

const columns = [
    { label: 'Name', fieldName: 'Name',type: 'text' },
    { label: 'Unit Number', fieldName: 'Unit_Numbers__c', type: 'Number' },
    { label: 'Building', fieldName: 'Building__c', type: 'text' }
];

export default class SelectUnitNumber extends LightningElement {
    
@track isModalOpen = false;
@api recordId;
 @track currenRecordId;
 @track columns=columns;
 @track allSelectedRows=[];
 @track allSelectedRowsBuilding=[];
 @track sData=[];
 @track error;
 


 connectedCallback() {
        this.currenRecordId = this.recordId;
       console.log("this.currenRecordIds"+this.currenRecordId);

       getUnitBuilding({selectedId:this.currenRecordId})
       .then(result=>{
           if(result){
           console.log("result:"+JSON.stringify(result));
           this.sData=result;
           console.log("data:"+JSON.stringify(this.sData));
           }
       })
       .catch(error=>{
           this.error=error
           console.log("ethis.error:"+this.error);
       })
    }




    handleClick(event) {
        this.allSelectedRows=[];
        this.allSelectedRowsBuilding=[];
        const selectedRows = event.detail.selectedRows;
        console.log("selectedRows:=="+ JSON.stringify(selectedRows));
        // Display that fieldName of the selected rows
        
            console.log("selectedRows===="+ JSON.stringify(selectedRows.Id));
    for(let i=0;i<selectedRows.length;i++){
        this.allSelectedRows.push(selectedRows[i].Id);
        this.allSelectedRows.push(selectedRows[i].Name);
        this.allSelectedRows.push(selectedRows[i].Unit_Numbers__c);
        this.allSelectedRowsBuilding.pushthis(selectedRows[i].Building__c);

        console.log("this.allSelectedRows::"+ JSON.stringify(this.allSelectedRows));
        console.log(" this.allSelectedRowsBuildings:"+ JSON.stringify(this.allSelectedRowsBuilding));
 
    }
       

    
       window.console.log("this.allSelectedRows::"+ JSON.stringify(this.allSelectedRows));
       window.console.log(" this.allSelectedRowsBuildings:"+ JSON.stringify(this.allSelectedRowsBuilding));
    }

    /**-----------popup Modal Functionality------- */
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }
}