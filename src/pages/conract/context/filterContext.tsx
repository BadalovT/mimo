// create context for filter

import {createContext} from "react";
import {FilterStateType} from "../../../types/contract";

type FilterContextType = {
    filter: FilterStateType;
    setFilter: (filter: any) => void;
    updateFilterByKey: (value: any, key: keyof FilterStateType) => void;
}

export const FilterContext = createContext<FilterContextType>({} as FilterContextType)


// provider for filter

