"use client";
import { useEffect, useState } from "react";
import WorkInfo from "../components/workPlace/WorkInfo";
import WorkPlace from "../models/WorkPlace";
import styles from "./styles/workPlace.module.css";

export default function WorkPlaces({ workPlaces }: { workPlaces: WorkPlace[] }) {
   const processNameOptions = new Set<string>();
   const processTypeOptions = new Set<string>();
   workPlaces.forEach((workPlace) => {
      workPlace.prodProcesses.forEach((prodProcess) => {
         processNameOptions.add(prodProcess.name);
         processTypeOptions.add(prodProcess.prodType);
      });
   });
   const [workPlaces_, setWorkPlaces_] = useState(workPlaces);
   const [workPlaceSearch, setWorkPlaceSearch] = useState({
      error: "",
      workPlaceName: "",
      jobId: "",
      dateStart: "",
      dateEnd: "",
      processName: "",
      processType: "",
   });

   function Search(e: any) {
      e.preventDefault();
      let error = "";
      let items: WorkPlace[] = workPlaces;
      Object.getOwnPropertyNames(workPlaceSearch).forEach((val, idx, array) => {
         switch (val) {
            case "workPlaceName":
               if (workPlaceSearch[val] != "") items = handleSearchByName(items);
               break;
            case "jobId":
               if (workPlaceSearch[val] != "") items = handleSearchByJobId(items);
               break;
            case "dateStart":
               if (workPlaceSearch[val] != "") items = handleSearchByStartDate(items);
               break;
            case "dateEnd":
               if (workPlaceSearch[val] != "") items = handleSearchByEndDate(items);
               break;
            case "processName":
               if (workPlaceSearch[val] != "") items = handleSearchByProcName(items);
               break;
            case "processType":
               if (workPlaceSearch[val] != "") items = handleSearchByProcType(items);
               break;
            default:
               break;
         }
      });
      if (items.length == 0) {
         error = "Nothing found";
      } else if (items.length > 0) {
         error = "";
      }
      setWorkPlaceSearch({
         ...workPlaceSearch,
         error: error,
      });
      setWorkPlaces_(items);
   }

   function handleSearchByName(items: WorkPlace[]) {
      let searchedPlaces = items.filter((x) => x.name == workPlaceSearch.workPlaceName);
      return searchedPlaces;
   }
   function handleSearchByJobId(items: WorkPlace[]) {
      let searchedPlaces = items.filter((x) => {
         if (x.prodProcesses.findIndex((x) => x.jobId.toString() == workPlaceSearch.jobId) != -1) {
            return true;
         }
         return false;
      });
      searchedPlaces = searchedPlaces.map((x) => {
         let matchedProcesses = x.prodProcesses.filter((x) => x.jobId.toString() == workPlaceSearch.jobId);
         return {
            ...x,
            prodProcesses: matchedProcesses,
         };
      });
      return searchedPlaces;
   }

   function handleSearchByProcName(items: WorkPlace[]) {
      let searchedPlaces = items.filter((x) => {
         if (x.prodProcesses.findIndex((x) => x.name == workPlaceSearch.processName) != -1) {
            return true;
         }
         return false;
      });

      searchedPlaces = searchedPlaces.map((x) => {
         let matchedProcesses = x.prodProcesses.filter((x) => x.name == workPlaceSearch.processName);
         return {
            ...x,
            prodProcesses: matchedProcesses,
         };
      });
      return searchedPlaces;
   }
   function handleSearchByProcType(items: WorkPlace[]) {
      let searchedPlaces = items.filter((x) => {
         if (x.prodProcesses.findIndex((x) => x.prodType == workPlaceSearch.processType) != -1) {
            return true;
         }
         return false;
      });

      searchedPlaces = searchedPlaces.map((x) => {
         let matchedProcesses = x.prodProcesses.filter((x) => x.prodType == workPlaceSearch.processType);
         return {
            ...x,
            prodProcesses: matchedProcesses,
         };
      });
      return searchedPlaces;
   }
   function handleSearchByStartDate(items: WorkPlace[]) {
      let searchedPlaces = items.filter((x) => {
         if (x.prodProcesses.findIndex((x) => new Date(x.processStart) > new Date(workPlaceSearch.dateStart)) != -1) {
            return true;
         }
         return false;
      });
      if (searchedPlaces.length > 0) {
      }
      searchedPlaces = searchedPlaces.map((x) => {
         let matchedProcesses = x.prodProcesses.filter(
            (x) => new Date(x.processStart) > new Date(workPlaceSearch.dateStart)
         );
         return {
            ...x,
            prodProcesses: matchedProcesses,
         };
      });
      return searchedPlaces;
   }
   function handleSearchByEndDate(items: WorkPlace[]) {
      let searchedPlaces = items.filter((x) => {
         if (x.prodProcesses.findIndex((x) => new Date(x.processEnd) < new Date(workPlaceSearch.dateEnd)) != -1) {
            return true;
         }
         return false;
      });
      if (searchedPlaces.length > 0) {
      }
      searchedPlaces = searchedPlaces.map((x) => {
         let matchedProcesses = x.prodProcesses.filter(
            (x) => new Date(x.processEnd) < new Date(workPlaceSearch.dateEnd)
         );
         return {
            ...x,
            prodProcesses: matchedProcesses,
         };
      });
      return searchedPlaces;
   }

   function handleChange(e: any) {
      setWorkPlaceSearch({ ...workPlaceSearch, [e.target.name]: e.target.value });
   }
   function removeFilter(e: any) {
      setWorkPlaceSearch({ ...workPlaceSearch, [e.target.name]: "" });
   }
   return (
      <section>
         <div>
            <form onSubmit={Search} className={styles.filters}>
               <div>
                  <input
                     type="search"
                     name="workPlaceName"
                     onChange={handleChange}
                     value={workPlaceSearch.workPlaceName}
                  />
                  <div className={styles.filterBtns}>
                     <input type="submit" value="search by workplace name" />
                     <input
                        type="submit"
                        value="Remove filter"
                        className={styles.removeFilterBtn}
                        name="workPlaceName"
                        onClick={removeFilter}
                     />
                  </div>
               </div>

               <div>
                  <input type="search" name="jobId" onChange={handleChange} value={workPlaceSearch.jobId} />
                  <div className={styles.filterBtns}>
                     <input type="submit" value="search by job id" />
                     <input
                        type="submit"
                        value="Remove filter"
                        className={styles.removeFilterBtn}
                        name="jobId"
                        onClick={removeFilter}
                     />
                  </div>
               </div>
               <div>
                  <input
                     type="datetime-local"
                     name="dateStart"
                     onChange={handleChange}
                     value={workPlaceSearch.dateStart}
                  />
                  <div className={styles.filterBtns}>
                     <input type="submit" value="search by date start" />
                     <input
                        type="submit"
                        value="Remove filter"
                        className={styles.removeFilterBtn}
                        name="dateStart"
                        onClick={removeFilter}
                     />
                  </div>
               </div>
               <div>
                  <input type="datetime-local" name="dateEnd" onChange={handleChange} value={workPlaceSearch.dateEnd} />
                  <div className={styles.filterBtns}>
                     <input type="submit" value="search by date end" />
                     <input
                        type="submit"
                        value="Remove filter"
                        className={styles.removeFilterBtn}
                        name="dateEnd"
                        onClick={removeFilter}
                     />
                  </div>
               </div>
               <div>
                  <select name="processName" onChange={handleChange} value={workPlaceSearch.processName}>
                     <option value="">--Please choose an option--</option>
                     {[...processNameOptions].map((value: any) => {
                        return <option value={value}>{value}</option>;
                     })}
                  </select>
                  <div className={styles.filterBtns}>
                     <input type="submit" value="search by process name" />
                     <input
                        type="submit"
                        value="Remove filter"
                        className={styles.removeFilterBtn}
                        name="processName"
                        onClick={removeFilter}
                     />
                  </div>
               </div>
               <div>
                  <select name="processType" onChange={handleChange} value={workPlaceSearch.processType}>
                     <option value="">--Please choose an option--</option>
                     {[...processTypeOptions].map((value: any, index) => {
                        return <option value={value}>{value}</option>;
                     })}
                  </select>
                  <div className={styles.filterBtns}>
                     <input type="submit" value="search by process type" />
                     <input
                        type="submit"
                        value="Remove filter"
                        className={styles.removeFilterBtn}
                        name="processType"
                        onClick={removeFilter}
                     />
                  </div>
               </div>
            </form>
         </div>
         <h1>{workPlaceSearch.error}</h1>
         {workPlaces_.map((workPlace) => {
            return (
               <>
                  <WorkInfo workPlace={workPlace} />
               </>
            );
         })}
      </section>
   );
}
