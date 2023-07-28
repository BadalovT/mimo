import React, {useState} from "react";
import {FilterContext} from "./filterContext";
import {FilterStateType} from "../../../types/payment";


const PaymentFilterProvider = ({children}: any) => {

    const [filter, setFilter] = useState<FilterStateType>({
        ContractNo: {
            value: "",
            field: "contractNo",
            operator: "contains",
        },
        PaymentAmount: {
            value: "",
            field: "PaymentAmount",
            operator: "eq",
        },
        PaymentDate: {
            value: "",
            field: "PaymentDate",
            operator: "eq",
        },
        PaymentTypeName: {
            value: "",
            field: "PaymentTypeName",
            operator: "eq",
        },
        Year: {
            value: "",
            field: "Year",
            operator: "eq",
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

export default PaymentFilterProvider;