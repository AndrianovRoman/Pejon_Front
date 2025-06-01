import {LineType} from "./line.type";
import {ZoneType} from "./zone.type";

export type WarehouseLineType = {
  id: number,
  countLine: number,
  line: LineType[],
  name: string,
  zone: ZoneType[]
}
