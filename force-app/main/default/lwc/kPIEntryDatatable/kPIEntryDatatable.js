import { LightningElement, wire, api } from 'lwc';

import get_KPI_Entries from '@salesforce/apex/KPI_Entry_Controller.get_KPI_Entries';
import update_KPI_Entries from '@salesforce/apex/KPI_Entry_Controller.update_KPI_Entries';

import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Period Start Date', fieldName: 'Period_Start_Date__c' },
    { label: 'Period End Date', fieldName: 'Date__c' },
    { label: 'Value', fieldName: 'Value__c', editable: true },
    { label: 'Value Type', fieldName: 'Value_Type__c' }
]

export default class kPIEntryDatatable extends LightningElement {

    wiredRecords;
    error;
    draftValues = [];

    tableData;
    columns = COLUMNS;

    @wire(get_KPI_Entries)
    kpiEntryHandler(value) {

        // track the provisioned value
        this.wiredRecords = value;
        const { data, error } = value;

        if (data) {

            this.tableData = data;
            this.error = undefined;

        } else if (error) {

            this.error = error;
            this.tableData = undefined;

        }

    }

    async handleSave(event) {

        const updatedFields = event.detail.draftValues;

        await update_KPI_Entries({ data: updatedFields })
            .then(result => {

                console.log(JSON.stringify("Apex update result: " + result));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'KPI Entry updated',
                        variant: 'success'
                    })
                );

                refreshApex(this.wiredRecords).then(() => {
                    this.draftValues = [];
                });

            }).catch(error => {

                console.log('Error is ' + JSON.stringify(error));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating or refreshing records',
                        message: error.body.message,
                        variant: 'error'
                    })
                );

            });

    }

}