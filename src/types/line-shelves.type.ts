import {ShelfCellsType} from "./shelf-cells.type";

export type LineShelvesType = {
  id: number,
  count: number,
  name: string,
  shelfDtos: ShelfCellsType[]
}
