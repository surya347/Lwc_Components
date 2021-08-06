import { LightningElement,track, wire } from 'lwc';
import getOrgCredentials from '@salesforce/apex/gettingStartedController.getOrgCredentials';
import ORG_NAME from '@salesforce/schema/Orgs__c.Name';
import ORG_TYPE from '@salesforce/schema/Orgs__c.Org_Type__c';
import ORG_OWNER from '@salesforce/schema/Orgs__c.OwnerId';
import ORG_CONNECTED_APP_CONSUMER_KEY from '@salesforce/schema/Orgs__c.Connected_App_Consumer_Key__c';
import ORG_USERNAME from '@salesforce/schema/Orgs__c.Org_Username__c';


export default class OrgCredentials extends LightningElement {
    @track columns = [{ label: 'Org Name', fieldName: 'Name', type: 'text', sortable: true },
    { label: 'Org Type', fieldName: 'Org_Type__c', type: 'picklist', sortable: true },
    { label: 'Connected App Consumer Key', fieldName: 'Connected_App_Consumer_Key__c', type: 'text', sortable: true },];
    @track error;
    @track orgCredentialsList;
    createOrgCred = false;

    selectedFields = [ORG_NAME, ORG_TYPE,ORG_USERNAME,ORG_OWNER, ORG_CONNECTED_APP_CONSUMER_KEY];

    handleNew(){
        this.createOrgCred = true;
    }

    closeModal(){
        this.createOrgCred = false;
        window.location.reload();
    }
    saveRecords(){
        window.location.reload();
    }

    @wire(getOrgCredentials)
    wiredgetOrgCredentials({ error, data }) {
        if (data) {
            this.orgCredentialsList = data;
        } else if (error) {
            this.error = error;
        }
    }
}