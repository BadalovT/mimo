import React, {useState} from "react";
import {FilterContext} from "./filterContext";
import {FilterStateTypeRieltor, propertyFilterAction} from "../../../types/property";


const FilterProviderRieltor = ({children}: any) => {

    const [filter, setFilter] = useState<FilterStateTypeRieltor>({
      propertyName: {
        value: "",
        field: "propertyName",
        operator: "contains",
      },
        propertyUserName: {
            value: "",
            field: "propertyUserName",
            operator: "eq",
        },
        area: {
            value: "",
            field: "area",
            operator: "eq",
        },
        propertyPhone: {
            value: "",
            field: "propertyPhone",
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
        propertyAmount: {
            value: "",
            field: "propertyAmount",
            operator: "eq",
        },
        contractTypeId: {
            value: "",
            field: "contractTypeId",
            operator: "eq",
        },
        propertyStatus: {
            value: "",
            field: "propertyStatus",
            operator: "eq",
        },
        cityId: {
            value: "",
            field: "cityId",
            operator: "eq",
        }     ,
        stateId: {
            value: "",
            field: "stateId",
            operator: "eq",
        }   ,
        metroId: {
            value: "",
            field: "metroId",
            operator: "eq",
        }
    });

    // mame

    const updateFilterByKey = (value: any, key: keyof FilterStateTypeRieltor) => {
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

export default FilterProviderRieltor;