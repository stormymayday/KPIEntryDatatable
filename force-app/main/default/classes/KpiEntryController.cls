public with sharing class KpiEntryController {

    @AuraEnabled(cacheable=true)
    public static List<KPI_Entry__c> getKpiEntries() {

        return [SELECT Id, Name, Period_Start_Date__c, Date__c, Value__c, Value_Type__c From KPI_Entry__c WHERE KPI__r.Project__r.iDE_Country__r.Name = 'Bangladesh' and KPI__r.Project__r.Id = '0062D00000IIWYGQA5' ORDER BY Name LIMIT 20];

    }

    @AuraEnabled
    public static string updateKpiEntries( Object data ) {
        
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
