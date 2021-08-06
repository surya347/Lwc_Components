import { LightningElement,track, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import readCSV from '@salesforce/apex/uploadCandidateController.readCSVFile';

const columns = [
    { label: 'RRF id', fieldName: 'Resource_Request__c' }, 
    { label: 'Resource Name', fieldName: 'Resource_Request__r.Name' }, 
    { label: 'Candidates Name', fieldName: 'Name' }, 
    { label: 'Notice Period', fieldName: 'Notice_Period__c' }, 
    { label: 'Currency', fieldName: 'Currency__c' },
    { label: 'Interview Date', fieldName: 'Interview_Date__c'}, 
    { label: 'Location', fieldName: 'Location__c'}, 
    { label: 'candidate no.', fieldName: 'candidate_no__c'},
    { label: 'Position Close Date', fieldName: 'Position_Close_Date__c'},
    { label: 'Profile_Submitted_On__c', fieldName: 'Profile_Submitted_On__c'},
    { label: 'Project_Joined_Date__c', fieldName: 'Project_Joined_Date__c'},
    { label: 'Resorce Rejected on', fieldName: 'Resorce_Rejected_on__c'},
    { label: 'Status__c', fieldName: 'Status__c'},
    { label: 'Tentative Joined Date', fieldName: 'Tentative_Joined_Date__c'},


];

export default class InsertCandidateCsv extends LightningElement {
    @track currenRecordIds; 
    @api recordId;
    @track error;
    @track columns = columns;
    @track data;

    // accepted parameters
    get acceptedFormats() {
        return ['.csv'];
    }

    connectedCallback() {
        this.currenRecordIds = this.recordId;
       console.log("this.currenRecordIds"+this.currenRecordIds);

    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        console.log("uploadedFiles:>"+JSON.stringify(uploadedFiles));
        // calling apex class
        readCSV({idContentDocument : uploadedFiles[0].documentId,selectedId:this.currenRecordIds})
        .then(result => {
            window.console.log('result ===> '+result);
            this.data = result;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Candidates are created via CSV file!!!',
                    variant: 'success',
                }),
            );
        })
        .catch(error => {
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!!',
                    message: JSON.stringify(error),
                    variant: 'error',
                }),
            );     
        })

    }
}