import { LightningElement, wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import {registerListener,unregisterAllListeners} from 'c/pubSub';

export default class SubComp extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    connectedCallback(){
        registerListener('pubsubevent',this.handleCallback,this);
    }

    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    handleCallback(detail){
          alert('parameter from publisher'+detail.firstname);
    }
} 