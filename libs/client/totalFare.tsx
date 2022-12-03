import { Fare } from "@prisma/client";

export default function totalFare(fare: Fare) {
  let total = 0;
  total += fare.heating;
  total += fare.water;
  total += fare.commonElectricity;
  total += fare.elevatorElectricity;
  total += fare.householdWaste;
  total += fare.management;
  total += fare.representative;
  total += fare.buildingInsurance;
  total += fare.expenses;
  total += fare.disinfection;
  total += fare.consignmentManagement;
  total += fare.longTermRepairs;

  return total;
}
