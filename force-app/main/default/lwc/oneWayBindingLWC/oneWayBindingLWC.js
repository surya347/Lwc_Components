import { LightningElement,track } from 'lwc';
import createFootballerRecords from '@salesforce/apex/createFootballerRecords.createPlayer';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class OneWayBindingLWC extends LightningElement {
    @track playerObject = {}

    
    setPlayerData(event){
        var targetElement = event.target;
        this.playerObject[targetElement.dataset.fieldname] = targetElement.value;   

    }


    savePlayer(event){
        createFootballerRecords({footballerObj : this.playerObject}).
        then(result =>{
          
        })
        .catch(error =>{
            
            alert("some error occurred:");
        })
     
      this.showSuccessToast();
    }

    showSuccessToast() {
        const evt = new ShowToastEvent({
            title: 'player created',
            message: 'Record Updated successfully ',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
} 