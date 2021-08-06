import { LightningElement ,track,api} from 'lwc';
import appendRowbyID from '@salesforce/apex/GoogleWebService.appendRowbyID';

export default class GoogleSheetIntegration extends LightningElement {
    clickedButtonLabel;
    @track currenRecordIds;
    @api recordId;

    connectedCallback() {
        this.currenRecordIds = this.recordId;
        
        console.log("recordId:"+JSON.stringify(this.currenRecordIds));
        console.log("recordId:"+this.currenRecordIds);
        console.log("recordId:"+this.recordId);


        console.log("its fine now");

        // https://mail.google.com/
        // https://www.googleapis.com/auth/drive
        // https://www.googleapis.com/auth/spreadsheets
        // https://www.googleapis.com/auth/spreadsheets.readonly

    }

    handleClick(event) {
        this.clickedButtonLabel = event.target.label;
        appendRowbyID({contactId: this.currenRecordIds})
        .then(result =>{
            console.log("result: "+JSON.stringify(result));
        })
        .catch(error => {
            this.error = error;
            });
    }
} 