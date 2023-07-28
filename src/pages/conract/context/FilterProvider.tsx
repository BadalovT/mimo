import React, {useState} from "react";
import {FilterContext} from "./filterContext";
import {FilterStateType} from "../../../types/contract";


const ContractFilterProvider = ({children}: any) => {

    const [filter, setFilter] = useState<FilterStateType>({
        ContractNo: {
            value: "",
            field: "ContractNo",
            operator: "eq",
        },
        PropertyName: {
            value: "",
            field: "Property.name",
            operator: "contains",
        },
        ContractTypeId: {
            value: "",
            field: "ContractTypeId",
            operator: "eq",
        },
        ContractAmount: {
            value: "",
            field: "ContractAmount",
            operator: "eq",
        },
        StartDate: {
            value: "",
            field: "StartDate",
            operator: "eq",
        },
        EndDate: {
            value: "",
            field: "EndDate",
            operator: "eq",
        },
        FullName: {
            value: "",
            field: "FullName",
            operator: "contains",
        },
        Phone: {
            value: "",
            field: "Phone",
            operator: "contains",
        },
    });

    // mame

    const updateFilterByKey = (value: any, key: keyof FilterStateType) => {
        setFilter({
            ...filter,
            [key]: {
                ...filter[key],
                value: value,
            }
        })
    }
    return (
        <FilterContext.Provider value={{filter, setFilter, updateFilterByKey}}>
            {children}
        </FilterContext.Provider>
    )
}

export default ContractFilterProvider;