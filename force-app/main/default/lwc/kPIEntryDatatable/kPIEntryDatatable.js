import { LightningElement, wire, api } from 'lwc';
import get_KPI_Entries from '@salesforce/apex/KPI_Entry_Controller.get_KPI_Entries';

import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import KPI_ENTRY_ID_FIELD from '@salesforce/schema/KPI_Entry__c.Id';
import KPI_ENTRY_VALUE_FIELD from '@salesforce/schema/KPI_Entry__c.Value__c';


const COLUMNS = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Period Start Date', fieldName: 'Period_Start_Date__c' },
    { label: 'Period End Date', fieldName: 'Date__c' },
    { label: 'Value', fieldName: 'Value__c', editable: true },
    { label: 'Value Type', fieldName: 'Value_Type__c' }
]

export default class kpiEntryDatatable extends LightningElement {

    @api recordId;

    tableData
    columns = COLUMNS

    @wire(get_KPI_Entries)
    kpiEntryHandler({ data, error }) {

        if (data) {

            // console.log(data);

            this.tableData = data;

        }

        if (error) {

            // console.error(error);

        }

    }

}