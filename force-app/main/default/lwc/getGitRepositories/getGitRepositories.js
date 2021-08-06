import { LightningElement, track, wire } from 'lwc';
import getGitRepositories from '@salesforce/apex/gettingStartedController.getGitRepositories';
import getGitBranches from '@salesforce/apex/gettingStartedController.getGitBranches';
import {NavigationMixin} from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class GetGitRepositories extends NavigationMixin(LightningElement) {
    @track columns = [{ label: 'Git Branch Name', fieldName: 'Name', type: 'text', sortable: true },
    { label: 'Git Repository Name', fieldName: 'Git_Repository__c', type: 'text', sortable: true },
    { label: 'Org Name', fieldName: 'Org__c', type: 'text', sortable: true },
    { label: 'Git Branch', fieldName: 'Branch__c', type: 'text', sortable: true }];
    renderedCallback(){
       
    }
    
    @track error;
    @track gitRepositoriesList;
    @track gitBranchList;
    createGitRepo = false;
    allGitRepoArray = [];
    allGitBranchArray = [];
    selectedValue;
    selectedValueId;
    showGitBranch = false;
    isDataGit = false;
    selectedGit = true;

    handleNew(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Git_Repository__c',
                actionName: 'new'
            }
        });
    }
    handleNewGitBranch(){
        const defaultValues = encodeDefaultFieldValues({
            Git_Repository__c: this.selectedValueId
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Git_Branch__c',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
    }
    handleChange(event){
        this.selectedValueId = event.detail.value;
        this.showGitBranch = true;
    }

    @wire(getGitRepositories)
    wiredgetGitRepositories({ error, data }) {
        if (data) {
            this.gitRepositoriesList = data;
            this.gitRepositoriesList.forEach(element => {
                this.allGitRepoArray = [...this.allGitRepoArray, {label:element.Name,value:element.Id}];            
            });
        } else if (error) {
            this.error = error;
        }
    }
    @wire(getGitBranches,{selectedValueId:'$selectedValueId'})
    wiredgetGitBranches({ error, data }) {
        if (data) {
            this.gitBranchList = data;
            this.allGitBranchArray = [];
            let newArray = [];
            this.gitBranchList.forEach(element => {
                let newObject = {};
                newObject.Id = element.Id;
                newObject.Branch__c = element.Branch__c;
                newObject.Name = element.Name;
                if(element.Git_Repository__r.Name) {
                    newObject.Git_Repository__c = element.Git_Repository__r.Name;
                }
                if(element.Org__r.Name) {
                    newObject.Org__c = element.Org__r.Name;
                }
                newArray.push(newObject);         
            });
            if(Array.isArray(newArray) && newArray.length) {
                this.allGitBranchArray = newArray;
            }
        } else if (error) {
            this.error = error;
        }
        if(this.allGitBranchArray.length){
            this.isDataGit = true;
        }
        if(this.allGitBranchArray.length == 0){
            this.isDataGit = false;
        }
    }
}