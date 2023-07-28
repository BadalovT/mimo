// create context for filter

import {createContext} from "react";
import {FilterStateTypeBusiness} from "../../../types/contract";

type FilterContextType = {
    filter: FilterStateTypeBusiness;
    setFilter: (filter: any) => void;
    updateFilterByKey: (value: any, key: keyof FilterStateTypeBusiness) => void;
}

export const FilterContext = createContext<FilterContextType>({} as FilterContextType)


// provider for filter

