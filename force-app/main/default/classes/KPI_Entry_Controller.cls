public with sharing class KPI_Entry_Controller {

    @AuraEnabled(cacheable=true)
    public static List<KPI_Entry__c> get_KPI_Entries() {

        return [SELECT Id, Name, Period_Start_Date__c, Date__c, Value__c, Value_Type__c From KPI_Entry__c ORDER BY Name LIMIT 20];

    }

    @AuraEnabled
    public static string update_KPI_Entries( Object data ) {
        
        List < KPI_Entry__c > kpiEntriesForUpdate = ( List < KPI_Entry__c > ) JSON.deserialize(
            JSON.serialize( data ),
            List < KPI_Entry__c >.class
        );
        try {
            update kpiEntriesForUpdate;
            return 'Success: KPI Entry updated successfully';
        }
        catch (Exception e) {
            return 'The following exception has occurred: ' + e.getMessage();
        }

    }

}
