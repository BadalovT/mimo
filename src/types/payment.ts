export type allPaymentItem = {
    key: number;
    ContractName: string;
    PaymentAmount: number;
    PaymentDate: string;
    PaymentTypeName: string;
    Year: number;
    Month: string;
    Description: string;
};

export type getAllPaymentPagingRes = {
    items: allPaymentItem[];
    index: number;
    size: number;
    count: number;
    pages: number;
    hasPrevious: boolean;
    hasNext: boolean;
};



export type paymentState = {
    allPaymentPaging: getAllPaymentPagingRes;
    allPayment: allPaymentItem[];
    loading: boolean;
    isOpenModal: boolean;
    current_page: number;
    formValue: FormVal;
};

export type FormVal = {
    key?: number;
    ContractId: number;
    Month: string;
    PaymentAmount: number;
    PaymentDate: string;
    PaymentTypeId: number;
    Year: number;
    Description: string;
};


export type filterState = {
    filter: paymentFilter;
} | {}


export type paymentFilter = {
    field: string;
    operator: string;
    value: string;
    logic: string;
    filters: FilterStateType
};

export type paymentFilterAction = {
    field: string;
    operator: string;
    value: string;
}

export type FilterStateType = {
    ContractNo: paymentFilterAction;
    PaymentAmount: paymentFilterAction;
    PaymentDate: paymentFilterAction;
    PaymentTypeName: paymentFilterAction;
    Year: paymentFilterAction;
}

