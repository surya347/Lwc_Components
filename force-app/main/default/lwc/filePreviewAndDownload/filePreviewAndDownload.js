import { LightningElement,api,wire ,track} from 'lwc';
import getRelatedFilesByRecordId from '@salesforce/apex/filePreviewAndDownloadClass.getRelatedFilesByRecordId';
import getFile from '@salesforce/apex/filePreviewAndDownloadClass.getFile';
import uploadFile from '@salesforce/apex/FileUploaderClass.uploadFile'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';

export default class FilePreviewAndDownload extends NavigationMixin(LightningElement)  {
    @api recordId;
    filesList =[]
    clickedButtonLabel;
    @track Link = '1KYmg5zV14M0_lBBbmVpRIL5nDRmmt_Dm';
    @track data;
    @track value;
    @api myRecordId;
    fileData;

    //----file upload function starts-------//
    openfileUpload(event) {
        const file = event.target.files[0]
        

        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log(this.fileData)
        }
        console.log("file>>:::"+JSON.stringify(this.file));
        reader.readAsDataURL(file)
        console.log("file>>:"+this.file);
    }
    

    handleClick(){
        const {base64, filename, recordId} = this.fileData
        uploadFile({ base64, filename, recordId }).then(result=>{
            this.fileData = null
            let title = `${filename} uploaded successfully!!`
            this.toast(title)
            console.log("result:"+result)
        })
    }

    toast(title){
        const toastEvent = new ShowToastEvent({
            title, 
            variant:"success"
        })
        this.dispatchEvent(toastEvent)
    }
    //----file upload function ends-------//

    //-------googledrive get file link functionality

    connectedCallback() {
        getFile({fileId:this.Link})
        .then(result =>{
            this.data = JSON.parse(result);
            console.log("data:"+this.data);

            //console.log(result);
            //console.log("embedLink:"+this.data.embedLink);
            //console.log("embedLinks:"+JSON.stringify(this.data.embedLink));

            
            this.value = this.data.embedLink;
           // console.log("value:=>"+this.value);
           
        })
        .catch(error=>{
            this.error = error;
        })
        

    }


    @wire(getRelatedFilesByRecordId, {recordId: '$recordId'})
    wiredResult({data, error}){ 
        if(data){ 
            console.log(JSON.stringify(data));
            this.filesList = Object.keys(data).map(item=>({"label":data[item],
             "value": item,
             "url":`/sfc/servlet.shepherd/document/download/${item}`
            }))
            console.log("filesList: "+JSON.stringify(this.filesList));
        }
        if(error){ 
            console.log(error)
        }
    }
    previewHandler(event){
        console.log(event.target.dataset.id)
        this[NavigationMixin.Navigate]({ 
            type:'standard__namedPage',
            attributes:{ 
                pageName:'filePreview'
            },
            state:{ 
                selectedRecordId: event.target.dataset.id
            }
        })
    }

    
}