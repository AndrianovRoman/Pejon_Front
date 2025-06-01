import {CellDtoType} from "./cellDto.type";

export type ShelfCellsType = {
  id: number,
  name: string,
  capacity: number,
  cellDto: CellDtoType[]
}
