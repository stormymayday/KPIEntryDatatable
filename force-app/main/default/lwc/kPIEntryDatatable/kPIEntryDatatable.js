import { LightningElement, wire, api } from 'lwc';

import getKpiEntries from '@salesforce/apex/KpiEntryController.getKpiEntries';
import updateKpiEntries from '@salesforce/apex/KpiEntryController.updateKpiEntries';

import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    // { label: 'Id', fieldName: 'Id' },
    {
        label: 'Name', fieldName: 'nameUrl', type: 'url',
        typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' }
    },
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

    @wire(getKpiEntries)
    kpiEntryHandler(value) {

        // track the provisioned value
        this.wiredRecords = value;
        const { data, error } = value;

        if (data) {

            let nameUrl;
            this.tableData = data.map(row => {
                nameUrl = `/${row.Id}`;
                return { ...row, nameUrl }
            })

            // this.tableData = data;
            this.error = undefined;

        } else if (error) {

            this.error = error;
            this.tableData = undefined;

        }

    }

    async handleSave(event) {

        const updatedFields = event.detail.draftValues;

        await updateKpiEntries({ data: updatedFields })
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