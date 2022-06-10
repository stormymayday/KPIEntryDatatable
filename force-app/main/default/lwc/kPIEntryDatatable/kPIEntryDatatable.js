import { LightningElement, wire } from 'lwc';
import get_KPI_Entries from '@salesforce/apex/KPI_Entry_Controller.get_KPI_Entries';

export default class kpiEntryDatatable extends LightningElement {

    @wire(get_KPI_Entries)
    kpiEntryHandler({ data, error }) {

        if (data) {
            console.log(data);
        }

        if (error) {
            console.error(error);
        }

    }

}