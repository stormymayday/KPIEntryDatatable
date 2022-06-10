public with sharing class KPI_Entry_Controller {
    
    @AuraEnabled(cacheable=true)
    public static List<KPI_Entry__c> get_KPI_Entries() {

        return [SELECT Name, Period_Start_Date__c, Date__c, Value__c, Value_Type__c From KPI_Entry__c ORDER BY Name LIMIT 20];

    }

}
