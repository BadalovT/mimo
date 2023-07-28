import React, {useState} from "react";
import {FilterContext} from "./filterContext";
import {FilterStateTypeBusiness} from "../../../types/property";


const FilterProviderBusiness = ({children}: any) => {

    const [filter, setFilter] = useState<FilterStateTypeBusiness>({
        name: {
            value: "",
            field: "name",
            operator: "contains",
        },

        rentPrice: {
            value: "",
            field: "rentPrice",
            operator: "eq",
        },
        area: {
            value: "",
            field: "area",
            operator: "eq",
        },
        rentStatus: {
            value: "",
            field: "rentStatus",
            operator: "eq",
        },
        propertyTypeId: {
            value: "",
            field: "propertyTypeId",
            operator: "eq",
        },
        blockId: {
            value: "",
            field: "blockId",
            operator: "eq",
        },
        floorId: {
            value: "",
            field: "floorId",
            operator: "eq",
        },
        roomId: {
            value: "",
            field: "roomId",
            operator: "eq",
        },
        isRepair: {
            value: "",
            field: "isRepair",
            operator: "eq",
        },
        projectId: {
            value: "",
            field: "projectId",
            operator: "eq",
        },
        comendantPrice: {
            value: "",
            field: "comendantPrice",
            operator: "eq",
        },
        communalActive: {
            value: "",
            field: "communalActive",
            operator: "eq",
        },
        salesPrice: {
            value: "",
            field: "salesPrice",
            operator: "eq",
        },
        salesStatus: {
            value: "",
            field: "salesStatus",
            operator: "eq",
        },
    });

    // mame

    const updateFilterByKey = (value: any, key: keyof FilterStateTypeBusiness) => {
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

export default FilterProviderBusiness;