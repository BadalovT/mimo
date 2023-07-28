import React, {useState} from "react";
import {FilterContext} from "./filterContext";
import {FilterStateType} from "../../../types/property";


const FilterProvider = ({children}: any) => {

    const [filter, setFilter] = useState<FilterStateType>({
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
        cityId: {
            value: "",
            field: "cityId",
            operator: "eq",
        },
        stateId: {
            value: "",
            field: "stateId",
            operator: "eq",
        },
        metroId: {
            value: "",
            field: "metroId",
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
        }


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

export default FilterProvider;