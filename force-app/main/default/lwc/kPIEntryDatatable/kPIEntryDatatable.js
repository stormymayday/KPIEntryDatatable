import { LightningElement, wire } from 'lwc';
import get_KPI_Entries from '@salesforce/apex/KPI_Entry_Controller.get_KPI_Entries';

const COLUMNS = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Period Start Date', fieldName: 'Period_Start_Date__c' },
    { label: 'Period End Date', fieldName: 'Date__c' },
    { label: 'Value', fieldName: 'Value__c', editable: true },
    { label: 'Value Type', fieldName: 'Value_Type__c' }
]

export default class kpiEntryDatatable extends LightningElement {

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