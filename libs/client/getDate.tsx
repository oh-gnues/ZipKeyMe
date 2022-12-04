import { Fare } from "@prisma/client";

export default function getDate(fare: Fare): {
  year: number;
  month: number;
  day: number;
} {
  const splitFareAt = fare.fareAt.toString().split("-");
  return {
    year: +splitFareAt[0],
    month: +splitFareAt[1],
    day: +splitFareAt[2].substring(0, 2),
  };
}
