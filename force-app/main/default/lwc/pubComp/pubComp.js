import { LightningElement, wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import {fireEvent} from 'c/pubSub';

export default class PubComp extends LightningElement {
    @wire (CurrentPageReference) pageRef;
    
    
    callEvent(event){
        var eventParam = {"firstname":"Surya"};
        fireEvent(this.pageRef,'pubsubevent',eventParam);
         
    }
} 