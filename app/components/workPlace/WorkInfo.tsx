import WorkPlace from "@/app/models/WorkPlace";
import styles from "./workInfo.module.css"
export default function WorkInfo({ workPlace }: { workPlace: WorkPlace }) {
   return (
      
      <div className={styles['table-wrapper']}>
         <h2>Miejsce pracy : {workPlace.name}</h2>
         <table className={styles['fl-table']}>
            <thead>
               <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Id</th>
                  <th scope="col">Job id</th>
                  <th scope="col">Process start</th>
                  <th scope="col">Process end</th>
                  <th scope="col">Production type</th>
               </tr>
            </thead>
            <tbody>
               {workPlace.prodProcesses.map((prodProcess) => {
                  return (
                     <tr>
                        <th scope="row">{prodProcess.name}</th>
                        <td>{prodProcess.id}</td>
                        <td>{prodProcess.jobId}</td>
                        <td>{prodProcess.processStart.toString()}</td>
                        <td>{prodProcess.processEnd.toString()}</td>
                        <td>{prodProcess.prodType}</td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
}
