import ProdProcess from "./ProdProcess";

export default interface WorkPlace {
   id: number;
   name: string;
   code: string;
   prodProcesses: Array<ProdProcess>;
}
