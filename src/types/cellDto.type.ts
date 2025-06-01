import {ContainerType} from "./container.type";

export type CellDtoType = {
    id: number,
    name: string,
    description: string,
    transportContainer: ContainerType,
    storage: {
      id: number,
      name: string,
      capacity: number,
      warehouse: {
        id: number,
        name: string,
        countLine: number
      }
    }
}
