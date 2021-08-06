import { LightningElement, track } from 'lwc';
import getAllRepositories from '@salesforce/apex/GithubCommunication.getAllRepositories';

const COLUMNS = [
    { label: 'Repository Name', fieldName: 'name' },
    { label: 'Repo Full Name', fieldName: 'full_name' },
    { label: 'Private', fieldName: 'private', type: 'boolean' }
];

export default class GithubRepositories extends LightningElement {

    @track repositories = [];
    columns = COLUMNS;
    totalcount;

    connectedCallback() {
        getAllRepositories().then(data => {
            let response = JSON.parse(data);
            this.totalcount = response.total_count;
            this.repositories = response.items;
        }).catch(err => {
            console.error(err);
        });
    }
}