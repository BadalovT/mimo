// create context for filter

import {createContext} from "react";
import {FilterStateTypeRieltor} from "../../../types/property";

type FilterContextType = {
    filter: FilterStateTypeRieltor;
    setFilter: (filter: any) => void;
    updateFilterByKey: (value: any, key: keyof FilterStateTypeRieltor) => void;
}

export const FilterContext = createContext<FilterContextType>({} as FilterContextType)


// provider for filter

