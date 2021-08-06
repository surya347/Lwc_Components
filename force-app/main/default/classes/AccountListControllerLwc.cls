public with sharing class AccountListControllerLwc {
    @AuraEnabled(cacheable=true)
    public static List<Account> queryAccountsByEmployeeNumber(Integer numberOfEmployees) {
        return [
            SELECT Name
            FROM Account
            WHERE NumberOfEmployees >= :numberOfEmployees
        ];
   }

   @AuraEnabled(cacheable=true)
   public static Account queryAccountsByRevenue(Decimal annualRevenue){
    return [ SELECT Name FROM Accoun WHERE AnnualRevenue >= :annualRevenue ];
   }
}